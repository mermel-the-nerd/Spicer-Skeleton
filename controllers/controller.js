import Teacher from '../models/Teacher.js';
import Class from '../models/Class.js';
import Block from '../models/Block.js';


const teacherss = [
    "Harrison, William",
    "Hatchman, Laura",
    "Greenstone, Willa",
    "Skophammer, Ryan",
    "Kelley, Melissa",
    "Mukai, Emily",
    "Duncan, Max",
    "Rogers, Autumn",
    "Perahya, Dan"
  ];


export const getExamples = async (req, res) => {
    try {
        const teacherObjects = await Teacher.insertMany(teacherss.map(advisee => ({name: advisee})));
        res.render('index');//loads the page: index, passing examples
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

