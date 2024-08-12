import mongoose from 'mongoose'

async function connectDb() {
    try {
        console.log('Connection established')
        return await mongoose.connect(process.env.DB_URL);
    } catch (err) {
        console.log('error', err)
    }
}

export default connectDb;