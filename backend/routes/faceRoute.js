const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const EmployeeModel = require("../models/Employee");
const router = express.Router();

// Face registration route
router.post("/register-face", (req, res) => {
    const { name, email, password, image } = req.body;

    if (!image) {
        console.error("Image data is required");
        return res.status(400).json("Image data is required");
    }

    // Save image to temp folder
    const imgPath = path.join(__dirname, '../temp', `${Date.now()}_register.jpg`);
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");

    try {
        fs.writeFileSync(imgPath, base64Data, "base64");
        console.log("Image saved to:", imgPath);
    } catch (err) {
        console.error("Error saving image:", err);
        return res.status(500).json("Error saving image");
    }

    // Call Python script
    exec(`python scripts/face_recognition_script.py register ${imgPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error("Python script error:", error);
            console.error("Python stderr:", stderr);
            fs.unlinkSync(imgPath); // Clean up the temporary file
            return res.status(500).json("Face processing failed");
        }

        console.log("Python script output:", stdout);
        try {
            const faceData = JSON.parse(stdout);

            // Check if the Python script returned an error
            if (faceData.error) {
                console.error("Face detection error:", faceData.error);
                fs.unlinkSync(imgPath); // Clean up the temporary file
                return res.status(400).json(faceData.error); // Return the error message
            }

            // Ensure faceData is valid
            if (!faceData || !faceData.faceData || !Array.isArray(faceData.faceData)) {
                console.error("Invalid faceData format:", faceData);
                fs.unlinkSync(imgPath); // Clean up the temporary file
                return res.status(500).json("Invalid face data format");
            }

            // Log the data before insertion
            console.log("Data to be inserted:", { name, email, password, faceData: faceData.faceData });

            // Insert into MongoDB
            EmployeeModel.create({ name, email, password, faceData: faceData.faceData })
                .then(user => {
                    fs.unlinkSync(imgPath); // Clean up the temporary file
                    res.json(user);
                })
                .catch(err => {
                    console.error("MongoDB insertion error:", err);
                    fs.unlinkSync(imgPath); // Clean up the temporary file
                    res.status(400).json("Registration error");
                });
        } catch (jsonError) {
            console.error("Error parsing JSON from Python script:", jsonError);
            console.error("Output was:", stdout);
            fs.unlinkSync(imgPath); // Clean up the temporary file
            return res.status(500).json("Error processing face data");
        }
    });
});
module.exports = router;