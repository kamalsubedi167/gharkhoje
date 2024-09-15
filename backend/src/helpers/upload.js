import multer from "multer";
import path from "path";




const storage = multer.diskStorage({
    destination: (req, file, cb) => {


    const folderPath = 'public/uploads';

      cb(null, folderPath);
    },
    filename: (req, file, cb) => {

      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Rename file to avoid collisions
    }
  });

  // const upload = multer({ storage: storage });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|webp|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  };
  
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 15 * 1024 * 1024 }, // Limit file size to 5MB
  });

export default upload;