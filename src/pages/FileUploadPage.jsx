import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFile } from 'react-icons/fa'; // Import file icon from react-icons
import './FileUploadPage.css'
import { toast } from 'react-toastify';
import { Spinner } from '@chakra-ui/react';

const FileUploadPage = () => {

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const [file, setFile] = useState(null);
    const [url,setUrl]=useState();
    const [loading,SetLoading]=useState(false);
    const [title, setTitle] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]
);

   const [reloadFile,setReloadFile]=useState(false);

    // Function to handle file selection
    const handleFileChange =async (e) => {
        if(!e.target.files[0]){
             toast({
               title: "please select an file",
               status: "warning",
               duration: 4000,
               isClosable: true,
               position: "top",
             });
             return;
        }
        SetLoading(true);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        const{ data} = await axios.post("http://127.0.0.1:8000/upload", formData);
        // console.log(data);
        SetLoading(false);
        setUrl(data.url);
    };

    // Function to handle title input
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handlerOnSubmit=async()=>{
        if(!title || !url){
            toast({
              title: "please select an file",
              status: "warning",
              duration: 4000,
              isClosable: true,
              position: "top",
            });
            return;
        }
        const { data } = await axios.post(
          "http://127.0.0.1:8000/resource/add",{
            url:url,
            title:title
          },config
          
        );
        // console.log(data);
        if(data){
             toast({
               title: "your notes updated successfully",
               status: "warning",
               duration: 4000,
               isClosable: true,
               position: "top",
             });
             return;
        }

    }

    const getAllnotes=async()=>{
         const { data } = await axios.get(
           "http://127.0.0.1:8000/resource/get",
           config
         );

         if(data){
            // console.log(data);
            setUploadedFiles(data);
            setReloadFile(!reloadFile);
            setUrl('');
            setTitle('');
         }
    }



    useEffect(() => {
      getAllnotes();
    }, [reloadFile])
    


    return (
      <div>
        <h2>File Upload</h2>
        <div className="file-upload-container">
          {loading && <Spinner position={"absolute"} />}
          <input
            type="file"
            className="file-input"
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
          <input
            type="text"
            value={title}
            className="text-input"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="upload-button" onClick={(e) => handlerOnSubmit()}>
            Upload
          </button>
        </div>
        <h3>Uploaded Files:</h3>
        <div className="file-list">
          {uploadedFiles &&
            uploadedFiles.length!=0&&uploadedFiles.map((file) => (
              <div className="file-box" key={file.id}>
                <a href={`${file.url}`} target='_blank'>
                  <FaFile className="file-icon" />
                  <span className="file-title">{file.title}</span>
                </a>
              </div>
            ))}
        </div>
      </div>
    );
};

export default FileUploadPage;
