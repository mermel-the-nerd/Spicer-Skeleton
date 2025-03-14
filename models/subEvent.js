import mongoose from 'mongoose';

const subEventSchema = new mongoose.Schema({
    orginalTeacherName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    subbingTeacherName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        
    },
    className: {
        type: String, 
        required: true },

    block: { 
        type: String, 
        required: true, } ,

    date:{
        type: Date,
        requred: true,
    },

    notes: {
        type: String
    }
    
});

const SubEvent = mongoose.model('SubEvent', subEventSchema);

export default SubEvent;

