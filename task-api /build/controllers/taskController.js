"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editTask = exports.addTask = exports.getOneTask = exports.getAllTask = void 0;
const task_1 = require("../models/task");
const getAllTask = async (req, res, next) => {
    let taskList = await task_1.Task.find();
    res.status(200).json(taskList);
};
exports.getAllTask = getAllTask;
const getOneTask = async (req, res, next) => {
    let itemId = req.params.id;
    let task = await task_1.Task.findById(itemId);
    res.status(200).json(task);
};
exports.getOneTask = getOneTask;
const addTask = async (req, res, next) => {
    const newTask = new task_1.Task({
        title: req.body.title,
        completed: req.body.completed
    });
    try {
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.addTask = addTask;
const editTask = async (req, res, next) => {
    let itemId = req.params.id;
    const updatedTask = new task_1.Task({
        _id: itemId,
        title: req.body.title,
        completed: req.body.completed
    });
    let result = await task_1.Task.findByIdAndUpdate(itemId, { $set: updatedTask });
    res.status(200).json(result);
};
exports.editTask = editTask;
const deleteTask = async (req, res, next) => {
    let itemId = req.params.id;
    let result = await task_1.Task.findByIdAndDelete(itemId);
    res.status(200).json(result);
};
exports.deleteTask = deleteTask;
