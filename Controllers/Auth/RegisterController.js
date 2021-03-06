const User = require('./../../service/Users');
const GruposUsuarios = require('./../../service/GruposUsuarios');
const registerEvent = require('./../../events/RegisterEvent');
const constants = require('./../../helpers/Constants')


module.exports = {
    async register(req, res) {
        try {
            let user_id = await User.register(req.body)
            let user = await User.getByID(user_id)
            await GruposUsuarios.setGroup(user_id, constants.CLIENTS)
            registerEvent(user)
            return res.status(201).json({ success: true, userId: user.id, email: user.email, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async validate(req, res) {
        try {
            let user = await User.getByToken(req.body)
            await User.validate(user.id)
            if (!user) {
                return res.status(400).json({ error: 'Token não localizado' })
            }
            res.status(200).json({ success: true, message: 'Token Validado' })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async checkEmailFree(req, res) {
        try {
            let user = await User.getByEmail(req.body.email)
            if (!user) {
                res.status(200).json({ success: true, message: 'email liberado para registro' })
            } else {
                return res.status(200).json({ success: false, message: 'email não liberado' })
            }
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

}