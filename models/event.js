import { Schema, model, models} from 'mongoose';

const EventSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    event:{
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

const Event = models.Event || model('Event', EventSchema);

export default Event;