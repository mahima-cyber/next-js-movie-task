import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: { type: String},
    updateAt: { type: String},
    deleteAt: { type: String}
});
const userModal = mongoose.models.user || mongoose.model('user', userSchema);

export default userModal;