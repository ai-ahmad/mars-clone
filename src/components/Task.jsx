import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = () => {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [adminComment, setAdminComment] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [task, setTask] = useState(null); // State to hold task data
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    // Fetch task data when the component mounts
    const fetchTaskData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/tasks/1'); // Replace with your actual endpoint
        setTask(response.data);
      } catch (error) {
        console.error('Vazifa ma\'lumotlarini olishda xatolik:', error);
      }
    };

    fetchTaskData();
  }, []);

  useEffect(() => {
    if (task) {
      const fetchComment = async () => {
        try {
          const response = await axios.get(`http://localhost:5001/files/${task.id}`);
          if (response.data.comment) {
            setAdminComment(response.data.comment);
          }
        } catch (error) {
          console.error('Izohni olishda xatolik:', error);
        }
      };

      fetchComment();
    }
  }, [task]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const postFile = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Iltimos, yuborishdan oldin faylni tanlang.');
      return;
    }

    const fileBase64 = await convertFileToBase64(file);
    const fileData = {
      filename: file.name,
      fileData: fileBase64,
      username: user.ism,
      userId: user.id,
      timestamp: new Date().toISOString(),
      status: 'Tasdiqlanmoqda',
    };

    try {
      const response = await axios.post('http://localhost:5001/files', fileData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUploadedFile(response.data);
      setUploadError(''); // Reset error on success
    } catch (error) {
      setUploadError('Faylni yuborishda xatolik: ' + error.message);
      console.error('Faylni yuborishda xatolik:', error);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <div className='flex gap-[20px]'>
        <div className='w-[430px] bg-white p-[15px] rounded-[10px]'>
          <b>
            <p className='bg-[#E0F6FF] w-[87px] text-center text-[#00A9F1] rounded-[7px] text-[11px]'>Vazifa haqida</p>
          </b>
          <b><h2 className='text-[#0E0D5D] text-[20px]'>{task.Topic}</h2></b>
          <p className='text-[#9E9E9E]'>{task.description}</p>
          {uploadedFile && (
            <div><strong><p className='text-[25px] text-[green]'>Yuborildi</p></strong></div>
          )}
        </div>

        <div className='bg-white w-[430px] rounded-[10px] p-[15px]'>
          <b>
            <p className='bg-[#E0F6FF] w-[77px] text-center text-[#00A9F1] rounded-[7px] text-[11px]'>Talablar</p>
          </b>
          <p className='text-[#0E0D5D] text-[17px]'><strong>Vazifaga qo'yilgan talablar:</strong></p>
          <p className='text-[#9E9E9E]'>{task.requirement}</p>
        </div>
      </div>

      <form onSubmit={postFile}>
        <div className='w-[880px] bg-white h-[160px] rounded-[10px] mt-5 p-4 flex flex-col items-end gap-3'>
          <input
            className='w-full h-[90px] bg-[#F6FAFD] rounded-[10px] flex items-center px-[30%] py-[3%]'
            type="file"
            onChange={handleFileChange}
          />
          <button type="submit" className='bg-[#EF400F] text-[white] p-2 rounded-[5px]'>Yuborish</button>
          {uploadError && <p className='text-red-500'>{uploadError}</p>}
        </div>
      </form>
    </div>
  );
};

export default Task;
