import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    // Add a field to store the file path
    filePath: {
        type: String,
        required: true
    },

    // Add a field to store the file name
    fileName: {
        type: String,
        required: true
    },

    // Add a field to store the file size if needed
    fileSize: {
        type: Number,
        required: true
    },

    // Add a field to store the file type if needed
    fileType: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const Register = mongoose.model("fileuploading", registerSchema);
export default Register;
