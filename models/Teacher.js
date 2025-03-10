import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    classes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Class", } ],

    avaliableBlocks: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Block", } ],
    
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;

