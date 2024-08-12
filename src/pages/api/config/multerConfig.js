import multer from 'multer';
import path from 'path';

// Configure storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

export default upload;