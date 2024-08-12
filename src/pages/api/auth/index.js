import Common from "../common";
import connectDb from "../config/db";
import userModal from "./authModal";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import Joi from 'joi';

const userValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
}).options({ abortEarly: false })

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        await connectDb()
        const hasUser = await userModal.findOne({ email });
        if (!hasUser) {
            return res.status(400).json({
                message: Common.INVALID_CREDENTIALS
            })
        }
        const passwordMatch = await bcrypt.compare(password, hasUser.password)
        if (passwordMatch) {
            const token = jwt.sign({ id: hasUser._id, email: hasUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '100h' })
            return res.status(200).json({
                message: 'success',
                data: {
                    token,
                    email: hasUser.email,
                    name: hasUser.name
                }
            })
        } else {
            res.status(400).json({
                message: Common.INVALID_CREDENTIALS
            })
        }

    } catch (err) {
        res.status(500).json({
            error: Common.INTERNAL_SERVER_ERROR
        })
    }
}

async function register(req, res) {
    const { body } = req;
    const { password } = body
    const encryptPassword = await bcrypt.hash(password, 10)
    const { error } = await userValidation.validate(body);
    if (error) res.status(400).json({
        message: Common.VALIDATION_ERROR,
        error: error?.details
    })
    try {
        const hasUser = await userModal.findOne({ email: body.email });
        if (hasUser) {
            return res.status(400).json({
                message: `User already exist with ${body.email}`
            })
        }
        await userModal.create({ ...body, password: encryptPassword });
        return res.status(200).json({
            message: 'User register successfully'
        })
    } catch (err) {
        res.status(500).json({
            error: Common.INTERNAL_SERVER_ERROR
        })
    }
}

const handler = async (req, res) => {
    switch (req.method) {
        case 'POST':
            return login(req, res);
        case 'PUT':
            return register(req, res);
        default:
            res.setHeader('Allow', ['PUT', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler