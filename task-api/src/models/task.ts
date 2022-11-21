import { Document, Schema, Model, model } from 'mongoose';

interface ITask extends Document {
    title: string;
    completed: boolean;
    
}

const taskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    completed: {
        type: Boolean,
        required: true
    }
    
});

const Task: Model<ITask> = model('Task', taskSchema);

export { ITask, Task };