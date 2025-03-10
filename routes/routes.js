import express from 'express';
import { getExamples } from '../controllers/controller.js';//communication between files

const router = express.Router();//getting it from the internet?

router.get('/', getExamples);//loads the page



export default router;
