/*import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register',{name,email,password})
        .then(result => {
            console.log(result)
            navigate('/login')
        })
        .catch(err=> console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autocomplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="enter email"
                            autocomplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="enter password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        register
                    </button>
                    <p>Already have an account</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-100 bg-light rounded-0">
                        login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;*/
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showCamera, setShowCamera] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowCamera(true);
    };

    const handleCaptureFaceData = async () => {
        // Capture the image from the webcam
        const image = webcamRef.current.getScreenshot(); // This should return a base64-encoded image
      
        if (!image) {
          alert("No image captured. Please try again.");
          return;
        }
      
        // Send the captured image and other data to the backend
        try {
          const response = await axios.post('http://localhost:3001/face/register-face', {
            name,
            email,
            password,
            image: image, // Ensure this matches the backend's expected field name
          });
          console.log(response.data);
          navigate('/login'); // Redirect to the login page after successful registration
        } catch (err) {
          console.error("Registration failed:", err);
          alert("Registration failed. Please try again.");
        }
      };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>

                {!showCamera && (
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">
                                <strong>Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                autoComplete="off"
                                name="name"
                                className="form-control rounded-0"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="form-control rounded-0"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                className="form-control rounded-0"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Next →
                        </button>
                    </form>
                )}

                {showCamera && (
                    <div>
                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                            videoConstraints={{ facingMode: "user" }}
                        />
                        <div className="mt-3 d-flex gap-2">
                            <button
                                onClick={handleCaptureFaceData}
                                className="btn btn-success flex-grow-1"
                            >
                                Capture Face
                            </button>
                            <button
                                onClick={() => setShowCamera(false)}
                                className="btn btn-danger"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegisterPage;