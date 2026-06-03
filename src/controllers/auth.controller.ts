import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
const { User } = require('../../models/index.js');

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existe = await User.findOne({ where: { email } });
    if (existe) {
      res.status(409).json({ mensaje: 'El email ya está registrado.' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente.',
      usuario: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      return;
    }

    const valida = await bcrypt.compare(password, user.password);
    if (!valida) {
      res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      return;
    }

    const secret = process.env['JWT_SECRET'] || 'mi_clave_secreta_super_segura_2024';
   const expiresIn = '1h' as SignOptions['expiresIn'];
    const token     = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn });

    res.status(200).json({ mensaje: 'Login exitoso.', token });
  } catch (error) {
    console.error('ERROR LOGIN:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión.' });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const user   = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'role'],
    });

    if (!user) {
      res.status(404).json({ mensaje: 'Usuario no encontrado.' });
      return;
    }

    res.status(200).json({ usuario: user });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el perfil.' });
  }
};