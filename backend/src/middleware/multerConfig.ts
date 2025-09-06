import multer from "multer";
import path from "path";

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// // File filter for Excel files
// const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
//   const allowedTypes = [
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
//     "application/vnd.ms-excel", // .xls
//     "text/csv", // .csv
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Yalnız Excel (.xls, .xlsx, .csv) faylları qəbul olunur"));
//   }
// };

export const upload = multer({
  storage,
//   fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB max
});
