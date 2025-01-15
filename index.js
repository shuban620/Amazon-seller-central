import express from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import path from 'path';
import mongoose from 'mongoose';
import Register from './Model/register.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all origins (development)
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'] }));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const filePath = req.file.path;

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Save the file info in MongoDB
    const newFile = new Register({
      filePath,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
    });

    const savedFile = await newFile.save();

    res.status(200).json({ message: 'File uploaded successfully', data, fileInfo: savedFile });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

// Sales data route
app.get('/api/sales-data', async (req, res) => {
  const { filterType } = req.query;

  try {
    const latestFile = await Register.findOne().sort({ createdAt: -1 });

    if (!latestFile) {
      return res.status(404).json({ message: 'No uploaded file found' });
    }

    const workbook = XLSX.readFile(latestFile.filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    let filteredData = data;

    if (filterType === '1') {
      const today = new Date().toISOString().split('T')[0];
      filteredData = data.filter((item) => item.date === today);
    }

    res.status(200).json(filteredData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ message: 'Error fetching sales data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
