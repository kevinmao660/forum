import { Schema, model, models} from 'mongoose';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt:{
        type: String, 
        required: [true, 'Prompt is required.'],
    }, 
    tag: {
        type: String, 
        required: [true, 'Tag is required'],
    },
    signups: {
        type: Array,
        required: [true, 'Signups is required']
    }
});

const Prompt = models.Event || model('Event', PromptSchema);

export default Prompt;