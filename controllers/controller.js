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
    
    const block = "B Block";
    const blockNeeded = await Block.findOne({ block: block });
  
    // Use map to create an array of promises
    const teacherEmails = blockNeeded.avaliableTeachers.map((teacher) => teacher.email)
        
   
  
    // Await all promises
    
    
    console.log(teacherEmails);

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
        const teacherEmails = blockNeeded.avaliableTeachers.map((teacher) => teacher.email)

       
          res.redirect(`/sendEmail/${teacherEmails} `)

       
      
    
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("An error occurred while processing the event.");
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
							name: `${currLine[2]}, ${currLine[1]}`,
							email: currLine[3]
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
							avaliableTeachers: [{name: `${currLine[2]}, ${currLine[1]}`, email: currLine[3]}]
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

export const sendEmail = async (req, res) => {
	try {
		const block = req.params.block
		// const templatePath = path.join(__dirname, "emailTemplate.ejs");
    // const emailTemplate = await fs.readFile(templatePath, "utf-8");


		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		})

   
		
		const htmlContent = ejs.renderFile('./views/sampleEmail.ejs', {
      link: "https://example.com/welcome",
    }, (data, err) => {
			if (err) {
				res.send("err" + err)

			}
			else{
				const mailOptions = {
					from: process.env.SMTP_USER,
					to: "sampleemail@myyahoo.com",
					subject: "Welcome Email",
					html: data,
				};
				transporter.sendMail(mailOptions)
				res.send('email was sent! promise')
			}
			
		});

		



		
			
	} catch (err) {
			res.status(500).send('Server Error \n' + err);
	}
};