import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
    block: {
        type: String,
        required: true,
    },  
    avaliableTeachers: [{
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        }
    }
    ]
});

const Block = mongoose.model('Block', blockSchema);

export default Block;

