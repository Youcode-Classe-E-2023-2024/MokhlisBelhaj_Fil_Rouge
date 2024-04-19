import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useApiAxios from '../config/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    imageFile: null, // State to store the selected image file
    imageUrl: '' // State to store the URL of the uploaded image
  });
  const [errors, setErrors] = useState({});

  const { name, email, password, password_confirmation, imageFile, imageUrl } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Upload image to Cloudinary
      const cloudName = 'dgnes9vrh'; // Replace with your Cloudinary cloud name
      const uploadPreset = 'Arthub'; // Replace with your Cloudinary upload preset
      const formData = new FormData();
      formData.append('file', imageFile); // Use the imageFile from the state
      formData.append('upload_preset', uploadPreset);

      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);

      const imageUrl = response.data.secure_url;
      console.log(imageUrl);

      // Register user with image URL
      const registerResponse = await useApiAxios.post('/register', {
        name,
        email,
        password,
        password_confirmation,
        imageUrl ,
        
      });
      console.log(imageUrl)

      console.log(registerResponse.data); 
      console.log(registerResponse.status);

      // Redirect to login page on successful registration
      if (registerResponse.status === 201) {
        navigate('/login');
      }

      // Clear form data after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        imageFile: null,
        imageUrl: ''
      });
    } catch (error) {
      console.error('Registration Error:', error.response.data);

      // Handle validation errors
      if (error.response && error.response.status === 403) {
        setErrors(error.response.data.data);
      }
    }
  };

  return (
    <section className="flex flex-col md:flex-row  items-center  " style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
    <div className="w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/2 h-fit px-6 lg:px-16 xl:px-12 flex items-center justify-center backdrop-blur-lg ">
      <div className="w-full min-h-screen h-fit p-5">
        <Link to="/" className="text-8xl text-white text-center font-semibold outline-text si">
          <h1 >ArtHub</h1>
        </Link>
        <h1 className="text-xl md:text-4xl text-white font-bold leading-tight mt-12 text-3d">Dive into Creativity: Connect Globally, Create Uniquely</h1>
        <form onSubmit={handleSubmit} className="mt-6" id="registerForm">
          <div className=''>
          <input  type="file" name="imageUrl" onChange={handleFileChange} />
            {imageFile && <img src={URL.createObjectURL(imageFile)}  alt="Selected" />}
            </div>
          <div className="mt-4">
            <label className="block text-white text-lg  font-bold">Name</label>
            <input type="text" name="name" value={name} onChange={handleChange} placeholder="Enter Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete required />
            {errors && errors.name && <p className="text-red-500">{errors.name[0]}</p>}
          </div>
          <div className="mt-4">
            <label className="block text-white text-lg  font-bold">Email Address</label>
            <input type="email" name="email" value={email} onChange={handleChange} placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete required />
            {errors && errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          </div>
          <div className="mt-4">
            <label className="block text-white text-lg  font-bold">Password</label>
            <input type="password" name="password" value={password} onChange={handleChange} placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
            {errors && errors.password && <p className="text-red-500">{errors.password[0]}</p>}
          </div>
          <div className="mt-4">
            <label className="block text-white text-lg  font-bold">Confirm Password</label>
            <input type="password" name="password_confirmation" value={password_confirmation} onChange={handleChange} placeholder="Confirm Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
            {errors && errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation[0]}</p>}
          </div>
          <button type="submit" className="mt-4 w-full block bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">Sign Up</button>
        </form>
        <hr className="my-6 border-gray-300 w-full" />
        <p className="mt-8 text-md font-bold text-center  w-fit backdrop-blur-xl">Already have an account? <Link to="/login" className="text-white hover:text-blue-700  font-semibold backdrop-blur-xl">Sign in</Link></p>
      </div>
    </div>
    <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen"></div>
  </section>
  );
};

export default Register;
