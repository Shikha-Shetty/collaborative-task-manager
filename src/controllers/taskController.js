const Task = require('../models/Task');
const Comment = require('../models/Comment');
const Attachment = require('../models/Attachment');

const { Op } = require('sequelize');

const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, assignedTo } = req.body;
        const assignedBy = req.userId;
        const task = await Task.create({
            title,
            description,
            dueDate,
            assignedTo,
            status : 'pending',
            assignedBy
        });

        res.status(201).json({ task, message: 'Task created successfully' });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const viewTask = async (req, res) => {
    const userId = req.userId;
    try {
        const tasks = await Task.findAll({ where: { assignedTo: userId } });
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateTask = async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.assignedTo !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this task' });
        }
        task.status = 'completed';
        await task.save();
        res.status(200).json({ message: 'Task marked as completed' });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const filterTaskByStatus = async (req, res) => {
    const userId = req.userId;
    const status = req.query.status;
    try {
        const tasks = await Task.findAll({ where: { assignedTo: userId, status: status } });
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error filtering tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const searchTask = async (req, res) => {
    const userId = req.userId;
    const keyword = req.query.keyword;
    try {
        const tasks = await Task.findAll({
            where: {
                assignedTo: userId,
                [Op.or]: [
                    { title: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } }
                ]
            }
        });
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error searching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const assignTask = async (req, res) => {
    const { taskId } = req.params;
    const { assignedTo } = req.body;
    const assignedBy = req.userId;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.assignedTo = assignedTo;
        task.assignedBy = assignedBy;
        await task.save();
        res.status(200).json({ message: 'Task assigned successfully', task });
    } catch (error) {
        console.error('Error assigning task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const collaborateWithTeam = async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.userId;
    const { commentText, filename, filetype, fileUrl } = req.body;

    try {
        const newComment = await Comment.create({
            taskId: taskId,
            userId: userId,
            comment: commentText
        });
        await newComment.save();
        const newAttachment = await Attachment.create({
            taskId: taskId,
            userId: userId,
            filename: filename,
            filetype: filetype,
            fileUrl: fileUrl
        });
        await newAttachment.save();
        res.status(200).json({ message: 'Collaboration successful', newComment, newAttachment });
    } catch (error) {
        console.error('Error collaborating with team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createTask, viewTask, updateTask, filterTaskByStatus, searchTask, assignTask, collaborateWithTeam };
