import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFile } from 'react-icons/fa'; // Import file icon from react-icons
import './FileUploadPage.css'

const FileUploadPage = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([
        {
            "_id": "1",
            "title": "Sample File 1.pdf"
        },
        {
            "_id": "2",
            "title": "Sample File 2.jpg"
        },
        {
            "_id": "3",
            "title": "Sample File 3.txt"
        }
    ]
);

    // Function to handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Function to handle title input
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // // Function to handle file upload
    // const handleUpload = async () => {
    //     if (!file || !title) {
    //         alert('Please select a file and provide a title');
    //         return;
    //     }

    //     try {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         formData.append('title', title);

    //         await axios.post('http://your-backend-url/upload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         alert('File uploaded successfully');
    //         // Clear file and title inputs after successful upload
    //         setFile(null);
    //         setTitle('');
    //         // Fetch uploaded files after successful upload
    //         fetchUploadedFiles();
    //     } catch (error) {
    //         console.error('Error uploading file:', error);
    //         alert('Error uploading file');
    //     }
    // };

    // // Function to fetch uploaded files from backend
    // const fetchUploadedFiles = async () => {
    //     try {
    //         const response = await axios.get('http://your-backend-url/files');
    //         setUploadedFiles(response.data);
    //     } catch (error) {
    //         console.error('Error fetching uploaded files:', error);
    //     }
    // };

    // // Fetch uploaded files on component mount
    // useEffect(() => {
    //     fetchUploadedFiles();
    // }, []);

    return (
        <div>
            <h2>File Upload</h2>
            <div className="file-upload-container">
                <input type="file" className="file-input" />
                <input type="text" value={title} className="text-input" placeholder="Enter title" />
                <button className="upload-button">Upload</button>
            </div>
            <h3>Uploaded Files:</h3>
            <div className="file-list">
                {uploadedFiles.map((file) => (
                    <div className="file-box" key={file._id}>
                        <FaFile className="file-icon" />
                        <span className="file-title">{file.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUploadPage;
