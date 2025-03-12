import Teacher from '../models/Teacher.js';
import SubEvent from '../models/SubEvent.js';
import Block from '../models/Block.js';
import fs from 'fs'
import path from 'path'



export const home= (req, res) => {
  res.render("index");
};

export const loadDataPage = async (req, res) => {
  try {
    const data = req.body.name
      res.render('data', {data});//loads the page: index, passing examples
  } catch (err) {
      res.status(500).send('Server Error');
  }
};
 
export const makeSubEvent= async (req, res) => {

  //are we just gonna have them put their names into the form?
  const { originalTeacherName, subbingTeacherName, className, block, date, notes } = req.body;
  try {
    const subEvent = new SubEvent({ originalTeacherName, subbingTeacherName, className, block, date, notes });
    await subEvent.save();
      
  } catch (err) {
      res.status(500).send('Server Error');
  }
};

export const populateAvailable= async (req, res) => {
  try {
    const result = [] 
      const filePath = path.join("./data", 'availableTeachers.csv'); 
      fs.readFile(filePath, 'utf8', async (err, data) => {
				if (err) {
          res.send("Failed to read the file: \n" + err);
          
        }

				const lines = data.split('\n')
        const headers = lines[0].split(",")

				let currBlock = ""
				let currId = ''
				for  (let i = 1; i < lines.length; i++) {
					// Block,firstName,LastName
					const currLine = lines[i].split(',')
					
					if (currBlock === currLine[0]){
						console.log(currId)
						const block = await Block.findById(currId)
						console.log(block._id)
						const newTeacher = {
							name: `${currLine[2]}, ${currLine[1]}`
						}
						// console.log(newClass)
						block.avaliableTeachers.push(newTeacher)
						await block.save()
          	result.push(block);
					}
					// if not then create a new teacher 
					else{
						currBlock = currLine[0]
						
						const block = new Block({ 
							block: currLine[0],
							avaliableTeachers: [{name: `${currLine[2]}, ${currLine[1]}`}]
						})
						currId = block._id
						console.log("currId = " + currId + "\n\n")
						await block.save()
          	result.push(block);
					}
				}
			})
			res.send(result)
  } catch (err) {
      res.status(500).send('Server Error');
  }
};

export const populateTeachers = async (req, res) => {
    try {
        //Course,email,lastName,firstName,Block,Room
      const result = [] 
      const filePath = path.join("./data", 'US Classes (272 records) 2025-03-10.csv'); 
      fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
          res.send("Failed to read the file: \n" + err);
          
        }
        const lines = data.split('\n')
        const headers = lines[0].split(",") //in case you want to make it more efficient
				
				
				let currEmail = ""
				let currId = ''
        for  (let i = 1; i < lines.length; i++) {
				// { name, email, classes: [{name, block, location}]  }
					
          const currLine = lines[i].split(',')
					console.log(currLine)
					if (currEmail === currLine[1]){
						console.log(currId)
						const teacher = await Teacher.findById(currId)
						console.log(teacher._id)
						const newClass = {
							name: currLine[0],
							block: currLine[4], 
							location: currLine[5]
						}
						// console.log(newClass)
						teacher.classes.push(newClass)
						await teacher.save()
          	result.push(teacher);
					}
					// if not then create a new teacher 
					else{
						currEmail = currLine[1]
						
						const teacher = new Teacher({ 
							name: `${currLine[2]}, ${currLine[3]}`, 
							email:  currLine[1], 
							classes: [{name: currLine[0], block: currLine[4], location: currLine[5]}]
						})
						currId = teacher._id
						console.log("currId = " + currId + "\n\n")
						await teacher.save()
          	result.push(teacher);
					}
					// name = last, first
          
          
        }
        
        res.send(result)
      });
  
    } catch (err) {
      console.log(err)
      res.status(500).send(`Server Error \n ${err}`);
    }
  };