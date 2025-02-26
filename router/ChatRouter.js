import express from 'express';
import { getMessages, sendMessage } from '../controller/chatController.js'

const router = express.Router();

router.get('/chat', getMessages);
router.post('/chat', sendMessage);

export default  router;
