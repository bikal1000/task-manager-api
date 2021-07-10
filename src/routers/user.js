const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { createUser,
    loginUser,
    logoutUser,
    logoutAll,
    getProfile,
    updateProfile,
    deleteProfile,
    uploadAvatar,
    deleteAvatar,
    getAvatar
} = require('../controller/user');
const router = new express.Router();

// @route   POST /users
// @desc    Create new user
// @access  Public
router.post('/users', createUser)

// @route   POST /users/login
// @desc   Login user
// @access  Public
router.post('/users/login', loginUser)

// @route   POST /users/logout
// @desc   Logout user
// @access  Private
router.post('/users/logout', auth, logoutUser)

// @route   POST /users/logoutAll
// @desc   Logout user
// @access  Private
router.post('/users/logoutAll', auth, logoutAll)

// @route   GET /users/me
// @desc   Get User Profile
// @access  Private
router.get('/users/me', auth, getProfile)

// @route   PATCH /users/me
// @desc   Update user profile
// @access  Private
router.patch('/users/me', auth, updateProfile)

// @route   DELETE /users/me
// @desc    Delete user profile
// @access  Private
router.delete('/users/me', auth, deleteProfile)

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
})

// @route   POST /users/me/avatar
// @desc    Upload user avatar
// @access  Private
router.post('/users/me/avatar', auth, upload.single('avatar'), uploadAvatar, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// @route   DELETE /users/me/avatar
// @desc    Delete user avatar
// @access  Private
router.delete('/users/me/avatar', auth, deleteAvatar)

// @route   GET /users/id/avatar
// @desc    Get user avatar
// @access  Public
router.get('/users/:id/avatar', getAvatar)

module.exports = router;