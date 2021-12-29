import express from 'express';
import { auth } from '../middleware/auth'; // middleware login
import postControler from '../controllers/post'

const router = express.Router();

router.route('/posts')
    .post(auth, postControler.createPost)
    .get(getPosts);

router.route('/posts/:id')
    .get(auth, postControler.getUserPosts)
    .patch(auth, postControler.updatePost)
    .delete(auth, postControler.deletePost)
module.exports = router;