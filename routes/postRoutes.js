import express from 'express';

import * as postController from '../controllers/postController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, postController.createPost);
router.get('/', postController.getPosts);

export default router;
