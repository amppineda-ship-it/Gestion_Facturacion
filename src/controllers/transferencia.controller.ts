import { Request, Response } from 'express';

export const realizarTransferencia = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId               = req.user!.id;
    const { monto, cuentaDestino } = req.body;

    res.status(200).json({
      mensaje: 'Transferencia exitosa.',
      detalle: {
        usuarioOrigen: userId,
        cuentaDestino,
        monto,
        fecha: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al procesar la transferencia.' });
  }
};