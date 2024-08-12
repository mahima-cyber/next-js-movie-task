import Common from "../common";
import connectDb from "../config/db";
import authMiddleware from "../middleware/authMiddleware";
import moviesModal from "./moviesModal";
import moviesValidation from "./moviesValidation";

const getMovies = async (req, res) => {
    try {
        await connectDb();
        const { pageNumber = Common.pageNumber, pageSize = Common.pageSize } = req.query;
        const page = parseInt(pageNumber);
        const size = parseInt(pageSize);
        const data = await moviesModal
            .find({ deleteAt: null })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
        const totalRecords = await moviesModal.countDocuments({ deleteAt: null });

        return res.status(200).json({
            message: 'success',
            data: {
                list: data,
                totalRecords,
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: Common.INTERNAL_SERVER_ERROR
        })
    }
};

const createMovie = async (req, res) => {
    try {
        await connectDb();
        const body = req.body;
        const { error } = moviesValidation.validate({ title: body.title, year: body.year });
        if (error) {
            return res.status(400).json({
                message: Common.VALIDATION_ERROR,
                error: 'Title & Year both are required'
            })
        }
        const hasCategory = await moviesModal.findOne({ title: body.title });
        if (hasCategory) {
            return res.status(400).json({
                message: 'Title already exist'
            })
        }
        const data = await moviesModal.create({
            ...body,
            createAt: new Date(),
            updateAt: null,
            deleteAt: null
        })
        return res.status(200).json({
            data,
            message: 'Movie create successfully.'
        })
    } catch (error) {
        return res.status(500).json({
            message: Common.INTERNAL_SERVER_ERROR
        })
    }
}

const handler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            return getMovies(req, res);
        case 'POST':
            return createMovie(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default authMiddleware(handler)