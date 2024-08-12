import Common from "../common";
import connectDb from "../config/db";
import authMiddleware from "../middleware/authMiddleware";
import moviesModal from "./moviesModal";
import moviesValidation from "./moviesValidation";

const getMovie = async (req, res) => {
    try {
        await connectDb();
        const { id } = req.query;
        const data = await moviesModal.findById(id);
        if (data) {
            return res.status(200).json({
                status: 'success',
                details: data
            })
        }
        return res.status(400).json({
            message: Common.DATA_NOT_FOUND
        })
    } catch (err) {
        return res.status(500).json({
            message: Common.INTERNAL_SERVER_ERROR
        })
    }
};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.query;
        const { title, year } = req.body;
        const { error } = moviesValidation.validate({ title, year });
        if (error) {
            return res.status(400).json({
                message: Common.VALIDATION_ERROR,
                error: 'Title & Year both are required'
            })
        }
        const hasMovie = await moviesModal.findById(id);
        if (!hasMovie) {
            return res.status(400).json({
                message: Common.DATA_NOT_FOUND
            })
        }
        const data = await moviesModal.findByIdAndUpdate(id, { title, year, updateAt: new Date() }, { new: true });
        return res.status(200).json({
            status: 'success',
            data,
            message: 'Movie updated successfully.'
        })
    } catch (err) {
        res.status(500).json({
            message: Common.INTERNAL_SERVER_ERROR
        })
    }
}

const handler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            return getMovie(req, res);
        case 'POST':
            return updateMovie(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default authMiddleware(handler)