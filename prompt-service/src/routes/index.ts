import { Router } from 'express';
import nutritionRoutes from './nutrition.routes'

const router = Router();

router.use('/nutrition', nutritionRoutes)

export default router;