import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },  
    avaliableTeachers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher", 
    }]
});

const Block = mongoose.model('Block', blockSchema);

export default Block;
    
