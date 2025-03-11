import express from 'express';
import { loadDataPage, home, populateTeachers} from '../controllers/controller.js';//communication between files

const router = express.Router();//getting it from the internet?

router.get('/', home);

router.post('/submitform', loadDataPage);//loads the page

router.get('/populate', populateTeachers)

export default router;
