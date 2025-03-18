import Teacher from '../models/Teacher.js';
import SubEvent from '../models/SubEvent.js';
import Block from '../models/Block.js';
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import ejs from 'ejs'
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

dotenv.config();



export const home= async (req, res) => {
  try {
      const teachers = await Teacher.find();
      const blocks = await Block.find()
      res.render("index", {teachers, blocks});
   } catch (error) {
    console.error("Error processing form:", error);
    res.status(500).send("Server error occurred.");
}
  
};

export const loadDataPage = async (req, res) => {
  //this is kinda my testing bit -maddie
  try {
    const teacherEmails = [];
    const block = "B Block";
    const blockNeeded = await Block.findOne({ block: block });
  
    // Use map to create an array of promises
    const teacherPromises = blockNeeded.avaliableTeachers.map(async (teacher) => {
      const foundTeacher = await Teacher.findOne({ name: teacher.name });
      return foundTeacher ? foundTeacher.name : null; // Handle case where teacher isn't found
    });
  
    // Await all promises
    const resolvedEmails = await Promise.all(teacherPromises);
    
    console.log(resolvedEmails);

    res.redirect('/')
  } catch (error) {
    console.error(error);
  }
  
}



 
export const makeSubEvent = async (req, res) => {
  const { originalTeacherName, subbingTeacherName, block, className, date, notes } = req.body;
  const selectedBlocks = req.body.blocks || {};

  try {
    //assume we need a sub
             
        const subEvent = new SubEvent({ originalTeacherName, subbingTeacherName, className, block, date, notes });
        await subEvent.save();  
        console.log(subEvent)
        // if (subbingTeacherName === "Not Provided") {
        //   // Call another function to send email to teacher
        //   const subbingTeacher = await Teacher.findOne({ name: 'subbingTeacherName' }); 
        //   //subbingTeacher.email
         const blockNeeded = await Block.findOne({block: block});

          res.redirect(`/sendEmail/${blockNeeded} `)

          const teacherEmails = []

        //   blockNeeded.avaliableTeachers.forEach( teacher=> {
        //     await teacherEmails.push(Teacher.findOne({name: teacher.name}).email)
        //  }      
        //  )
        

       
      
    
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("An error occurred while processing the event.");
  }
};


export const searchTeachers = async (req, res) => {
  const query = req.query.q || "";

  if (!query) {
    return res.json([]);
  }

  const results = await Teacher.find({ name: new RegExp(query, "i") })
  .limit(5)
  .exec();

  res.json(results);
}
      
export const getTeacherClasses = async (req, res) => {
  const teacherName = req.query.name;
  if (!teacherName) {
      return res.status(400).json({ error: "No teacher name provided" });
  }

  try {
      const teacher = await Teacher.findOne({ name: teacherName });
      if (!teacher) {
          return res.status(404).json({ error: "Teacher not found" });
      }

      res.json(teacher.classes);
  } catch (error) {
      console.error("Error fetching teacher classes:", error);
      res.status(500).json({ error: "Server error" });
  }
};
  

// export const populateAvailable= async (req, res) => {
//   try {
//     const result = [] 
//       const filePath = path.join("./data", 'availableTeachers.csv'); 
//       fs.readFile(filePath, 'utf8', async (err, data) => {
// 				if (err) {
//           res.send("Failed to read the file: \n" + err);
          
//         }

// 				const lines = data.split('\n')
//         const headers = lines[0].split(",")

// 				let currBlock = ""
// 				let currId = ''
// 				for  (let i = 1; i < lines.length; i++) {
// 					// Block,firstName,LastName
// 					const currLine = lines[i].split(',')
					
// 					if (currBlock === currLine[0]){
// 						console.log(currId)
// 						const block = await Block.findById(currId)
// 						console.log(block._id)
// 						const newTeacher = {
// 							name: `${currLine[2]}, ${currLine[1]}`,
// 							email: currLine[3]
// 						}
// 						// console.log(newClass)
// 						block.avaliableTeachers.push(newTeacher)
// 						await block.save()
//           	result.push(block);
// 					}
// 					// if not then create a new teacher 
// 					else{
// 						currBlock = currLine[0]
						
// 						const block = new Block({ 
// 							block: currLine[0],
// 							avaliableTeachers: [{name: `${currLine[2]}, ${currLine[1]}`, email: currLine[3]}]
// 						})
// 						currId = block._id
// 						console.log("currId = " + currId + "\n\n")
// 						await block.save()
//           	result.push(block);
// 					}
// 				}
// 			})
// 			res.send(result)
//   } catch (err) {
//       res.status(500).send('Server Error');
//   }
// };

// export const populateTeachers = async (req, res) => {
//     try {
//         //Course,email,lastName,firstName,Block,Room
//       const result = [] 
//       const filePath = path.join("./data", 'US Classes (272 records) 2025-03-10.csv'); 
//       fs.readFile(filePath, 'utf8', async (err, data) => {
//         if (err) {
//           res.send("Failed to read the file: \n" + err);
          
//         }
//         const lines = data.split('\n')
//         const headers = lines[0].split(",") //in case you want to make it more efficient
				
				
// 				let currEmail = ""
// 				let currId = ''
//         for  (let i = 1; i < lines.length; i++) {
// 				// { name, email, classes: [{name, block, location}]  }
					
//           const currLine = lines[i].split(',')
// 					console.log(currLine)
// 					if (currEmail === currLine[1]){
// 						console.log(currId)
// 						const teacher = await Teacher.findById(currId)
// 						console.log(teacher._id)
// 						const newClass = {
// 							name: currLine[0],
// 							block: currLine[4], 
// 							location: currLine[5]
// 						}
// 						// console.log(newClass)
// 						teacher.classes.push(newClass)
// 						await teacher.save()
//           	result.push(teacher);
// 					}
// 					// if not then create a new teacher 
// 					else{
// 						currEmail = currLine[1]
						
// 						const teacher = new Teacher({ 
// 							name: `${currLine[2]}, ${currLine[3]}`, 
// 							email:  currLine[1], 
// 							classes: [{name: currLine[0], block: currLine[4], location: currLine[5]}]
// 						})
// 						currId = teacher._id
// 						console.log("currId = " + currId + "\n\n")
// 						await teacher.save()
//           	result.push(teacher);
// 					}
// 					// name = last, first
          
          
//         }
        
//         res.send(result)
//       });
  
//     } catch (err) {
//       console.log(err)
//       res.status(500).send(`Server Error \n ${err}`);
//     }
//   };

export const sendEmailTest = async (req, res) => {
	sendEmail()
};

async function sendEmail(destination="sampleemail@myyahoo.com", content="./views/sampleEmail") {
	try{
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		})
		
		const htmlContent = ejs.renderFile(content, {
			link: "https://example.com/welcome",
		}, (data, err) => {
			if (err) {
				return "err" + err

			}
			else{
				const mailOptions = {
					from: process.env.SMTP_USER,
					to: "sampleemail@myyahoo.com", //sub this for destination later
					subject: "Welcome Email",
					html: data,
				};
				transporter.sendMail(mailOptions)
				return 'email was sent! promise'
			}
			
		});
	} catch (err) {
			return "server error" + err
	}
}