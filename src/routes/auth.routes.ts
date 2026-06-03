import { Router }                      from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { verifyToken }                 from '../middlewares/auth.middleware';
import { validateBody }                from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login',    validateBody(loginSchema),    login);
router.get('/perfil',    verifyToken,                  getProfile);

export default router;