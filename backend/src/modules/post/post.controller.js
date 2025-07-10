import addPost from "./services/addPost.service.js";
import getAllPosts from "./services/getAllPosts.service.js";
import updatePost from "./services/updatePost.service.js";
import deletePost from "./services/deletePost.service.js";
import { Router } from "express";

const router = Router();

router.post('/add' , addPost)
router.get('/all' , getAllPosts);
router.put('/update/:id' , updatePost);
router.delete('/delete/:id' , deletePost);


export default router;