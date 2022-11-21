import { RequestHandler } from "express";
import { Task, ITask } from "../models/task";


export const getAllTask: RequestHandler = async (req, res, next) => {
    let taskList = await Task.find();
    res.status(200).json(taskList);
}

export const getOneTask: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    let task = await Task.findById(itemId);
    res.status(200).json(task);
}

export const addTask: RequestHandler = async (req, res, next) => {
    const newTask: ITask = new Task({
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
}

export const editTask: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    const updatedTask: ITask = new Task({
        _id: itemId,
        title: req.body.title,
        completed: req.body.completed
        
    });

    let result = await Task.findByIdAndUpdate(itemId, { $set: updatedTask })

    res.status(200).json(result);
}

export const deleteTask: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    let result = await Task.findByIdAndDelete(itemId);
    res.status(200).json(result);
}