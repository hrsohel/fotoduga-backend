import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'uploads';
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// const uploadDir = path.join(__dirname, '..', 'uploads');   // <-- ALWAYS correct path

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Destination:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    console.log('Filename:', filename);
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
