import express from 'express';
import { loadDataPage, home, populateTeachers, populateAvailable, sendEmail, makeSubEvent, makeReport} from '../controllers/controller.js';//communication between files

const router = express.Router();//getting it from the internet?

router.get('/', home);

router.post('/testing', loadDataPage);

router.post('/submitform', makeSubEvent);//loads the page

router.get('/help', makeReport);//loads the page

router.get('/populateAvailable', populateAvailable)
router.get('/populateTeachers', populateTeachers)

router.get('/sendEmail', sendEmail)

export default router;
