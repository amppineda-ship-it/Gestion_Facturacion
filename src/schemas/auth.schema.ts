import { z } from 'zod';

export const registerSchema = z.object({
  name:     z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email:    z.string().email('Formato de email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role:     z.enum(['admin', 'client']).default('client'),
});

export const loginSchema = z.object({
  email:    z.string().email('Formato de email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const transferenciaSchema = z.object({
  monto:         z.number().positive('El monto debe ser mayor a 0'),
  cuentaDestino: z.string().min(5, 'La cuenta destino debe tener al menos 5 caracteres'),
});

export type RegisterInput      = z.infer<typeof registerSchema>;
export type LoginInput         = z.infer<typeof loginSchema>;
export type TransferenciaInput = z.infer<typeof transferenciaSchema>;