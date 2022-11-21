"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
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
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.Task = Task;
