import { Router }                from 'express';
import { realizarTransferencia } from '../controllers/transferencia.controller';
import { verifyToken }           from '../middlewares/auth.middleware';
import { validateBody }          from '../middlewares/validate.middleware';
import { transferenciaSchema }   from '../schemas/auth.schema';

const router = Router();

router.post('/', verifyToken, validateBody(transferenciaSchema), realizarTransferencia);

export default router;