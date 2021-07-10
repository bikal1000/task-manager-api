const User = require('../models/user');

const sharp = require('sharp');

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send()
    }
}

exports.logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).save();
    }
}

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).save();
    }
}

exports.getProfile = async (req, res) => {
    res.send(req.user);
}

exports.updateProfile = async (req, res) => {
    const _id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(404).send(e)
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user);

    } catch (e) {
        res.status(404).send(e);
    }
}

exports.uploadAvatar = async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send()
}

exports.deleteAvatar = async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
}

exports.getAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

    } catch (e) {
        req.status(404).send()
    }
}