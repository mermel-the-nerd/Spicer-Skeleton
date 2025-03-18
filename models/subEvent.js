import mongoose from 'mongoose';

const subEventSchema = new mongoose.Schema({
    originalTeacherName: {
        type: String,
       required: true,
    },
    subbingTeacherName: {
        type: String,
        
    },
    className: {
        type: String, 
        required: true },

    block: { 
        type: String, 
        required: true, } ,

    date:{
        type: Date,
        // required: true,
    },

    notes: {
        type: String
    },
    
});

const SubEvent = mongoose.model('SubEvent', subEventSchema);

export default SubEvent;

