import express from 'express';
import { loadDataPage, home, populateTeachers, populateAvailable, sendEmail} from '../controllers/controller.js';//communication between files

const router = express.Router();//getting it from the internet?

router.get('/', home);

router.post('/submitform', loadDataPage);//loads the page

router.get('/populateAvailable', populateAvailable)
router.get('/populateTeachers', populateTeachers)

router.get('/sendEmail', sendEmail)

export default router;
