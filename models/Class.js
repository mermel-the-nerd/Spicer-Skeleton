import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher",
        required: true,
    },
    block: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Block",
        required: true,
    },
    students: {
        type: Array,
        required: true,
    }
});

const Class = mongoose.model('Class', classSchema);

export default Class;

