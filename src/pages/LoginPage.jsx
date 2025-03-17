import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showCamera, setShowCamera] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowCamera(true);
    };

    const handleVerifyFace = async () => {
        // Capture the image from the webcam
        const imageSrc = webcamRef.current.getScreenshot();

        if (!imageSrc) {
            alert("No image captured. Please try again.");
            return;
        }

        // Send the captured image to the backend for verification
        try {
            const response = await axios.post('http://localhost:3001/face/verify-face', {
                email,
                password,
                image: imageSrc, // Use the captured image
            });

            if (response.data === "Success") {
                navigate('/home');
            } else {
                alert("Face mismatch. Please try again.");
            }
        } catch (err) {
            console.error("Error during face verification:", err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>

                {!showCamera && (
                    <form onSubmit={handleFormSubmit}>
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
                                onClick={handleVerifyFace}
                                className="btn btn-success flex-grow-1"
                            >
                                Verify Face
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

export default LoginPage;