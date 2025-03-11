import Teacher from '../models/Teacher.js';
import subEvent from '../models/SubEvent.js';
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

export const makeSubEvent= async (req, res) => {

  //are we just gonna have them put their names into the form?
  const { originalTeacherName, subbingTeacherName, className, block, date, notes } = req.body;
  try {
    const subEvent = new subEvent({ originalTeacherName, subbingTeacherName, className, block, date, notes });
    await subEvent.save();
      
  } catch (err) {
      res.status(500).send('Server Error');
  }
};

export const populateTeachers = async (req, res) => {
    try {
        //Course,email,lastName,firstName,Block,Room
      const result = [] 
      const filePath = path.join("./data", 'data/US Classes (272 records) 2025-03-10.csv'); 
      fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
          res.send("Failed to read the file: \n" + err);
          
        }
        const lines = data.split('\n')
        const headers = lines[0].split(",") //in case you want to make it more efficient
				
				
				let currEmail = ""
        for  (let i = 1; i < lines.length; i++) {
        //   const classes = lines[i].split('"')[1].split(",")
				
				// { name, email, classes: [{name, block, location}]  }
					
          const currLine = lines[i].split(',')
					if (currEmail === currLine[1]){
						// if email is the same as last then old model and push new class (do not combine classes)
					}
					// if not then create a new teacher
					else{
						const teacher = new Teacher({ 
							name: `${currLine[2]}, ${currLine[3]}`, 
							email:  currLine[1], 
							classes: [{name: currLine[0], block: currLine[4], location: currLine[5]}]
						})
					}
					// name = last, first
          
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