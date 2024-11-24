import { Router } from 'express';

import * as commentController from '../controllers/commentController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, commentController.createComment);

export default router;
