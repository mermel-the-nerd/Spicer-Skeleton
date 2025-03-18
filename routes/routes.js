import express from 'express';
import { loadDataPage, home,  makeSubEvent, sendEmailTest, searchTeachers, getTeacherClasses} from '../controllers/controller.js';//communication between files

const router = express.Router();//getting it from the internet?

router.get('/', home);

router.post('/testing', loadDataPage);

router.post('/submitform', makeSubEvent);//loads the page

// router.get('/populateAvailable', populateAvailable)
// router.get('/populateTeachers', populateTeachers)

router.get('/search', searchTeachers);
router.get('/getTeacherClasses', getTeacherClasses);

router.get('/sendEmail', sendEmailTest);

export default router;
