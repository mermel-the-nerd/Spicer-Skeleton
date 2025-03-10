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

export const populateTeachers = async (req, res) => {
    try {
      const result = [] 
      const filePath = path.join("./public", 'teachers.csv');
      fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
          res.send("Failed to read the file: \n" + err);
          
        }
        const lines = data.split('\n')
        const headers = lines[0].split(",") //in case you want to make it more efficient
        for  (let i = 1; i < lines.length; i++) {
          const classes = lines[i].split('"')[1].split(",")
          const nameEmail = lines[i].split(',', 2)
  
  
          const teacher = new Teacher({ name: nameEmail[0], email:  nameEmail[1], classes: classes})
          await teacher.save()
          result.push(teacher);
        }
        
        res.send(result)
      });
  
    } catch (err) {
      console.log(err)
      res.status(500).send(`Server Error \n ${err}`);
    }
  };