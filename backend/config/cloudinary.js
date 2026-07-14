const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Buffer the file in memory, then stream it to Cloudinary ourselves.
// This avoids relying on multer-storage-cloudinary, which is pinned to
// the old cloudinary v1 SDK and conflicts with cloudinary@^2.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Only .jpg, .jpeg, .png, and .webp images are allowed"));
  },
});

// Uploads a buffer (req.file.buffer) to Cloudinary, returns { url, publicId }
const uploadBufferToCloudinary = (buffer, folder = "bean-and-brew/coffees") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, transformation: [{ width: 800, height: 800, crop: "limit" }] },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

module.exports = { cloudinary, upload, uploadBufferToCloudinary };
