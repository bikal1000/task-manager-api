const express = require('express');
const auth = require('../middleware/auth')
const Task = require('../models/task');
const { createTask, getTasksList, getTask, updateTask, deleteTask } = require('../controller/task');

const router = new express.Router();

// @route   POST /tasks
// @desc    Create new task
// @access  Private
router.post('/tasks', auth, createTask)

// @route   GET /tasks
// @desc    Get list of tasks
// @access  Private
// filtering -- GET /tasks?completed=true
// pagination -- GET /tasks?limit=10&skip=10
// sorting --- GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, getTasksList)

// @route   GET /tasks
// @desc    Get task by id
// @access  Private
router.get('/tasks/:id', auth, getTask)

// @route   PATCH /tasks
// @desc    update task
// @access  Private
router.patch('/tasks/:id', auth, updateTask)

// @route   DELETE /tasks
// @desc     delete task
// @access  Private
router.delete('/tasks/:id', auth, deleteTask)

module.exports = router;