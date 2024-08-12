import mongoose from 'mongoose';

const moviesSchema = new mongoose.Schema({
    image: { type: String },
    title: { type: String, required: true },
    year: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: null },
    deleteAt: { type: Date, default: null },
    image: { type: String }
});
const moviesModal = mongoose.models.movies || mongoose.model('movies', moviesSchema);

export default moviesModal;