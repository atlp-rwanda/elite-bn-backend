import { Router } from 'express';
import authorize from '../../../middlewares/userAuthorization';
import commentController from '../../../controllers/tripComment';

const router = Router();
// comment
router.post('/trip/:id', authorize.userAuthorize, commentController.createComment);
router.delete('/trip/:tripId/comment/:id/delete', authorize.userAuthorize, commentController.deleteComment);
router.get('/trip/:tripId', authorize.userAuthorize, commentController.list);

export default router;
