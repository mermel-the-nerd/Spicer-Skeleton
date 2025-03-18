import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    classes: [ {
        name: {
        type: String,
        required: true,
    },    
        block: {
            type: String,
            required: true,
    },
        location: {
            type: String,
            required: true,
        }
    } ],

        
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;

