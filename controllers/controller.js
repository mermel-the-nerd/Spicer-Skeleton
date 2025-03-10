import Teacher from '../models/Teacher.js';

import Block from '../models/Block.js';



export const home= (req, res) => {
  res.render("index");
};

export const loadDataPage = async (req, res) => {
  try {
    const data = req.body.notes
      res.render('data', {data});//loads the page: index, passing examples
  } catch (err) {
      res.status(500).send('Server Error');
  }
};

export const populateTeachers = async (req, res) => {
    try {
        //Course,TEACHER: Email 1,Class ID,Description,Teacher,Block,Grading Periods,Room
      const result = [] 
      const filePath = path.join("./data", 'data/US Classes (272 records) 2025-03-10.csv'); 
      fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
          res.send("Failed to read the file: \n" + err);
          
        }
        const lines = data.split('\n')
        const headers = lines[0].split(",") //in case you want to make it more efficient
				
				

        for  (let i = 1; i < lines.length; i++) {
        //   const classes = lines[i].split('"')[1].split(",")
				// if teacher exists then add to the array 
				// { name, email, classes: [{name, block, location}]  }
					
          const nameEmail = lines[i].split(',')
  
  
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