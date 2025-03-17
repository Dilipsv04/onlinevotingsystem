import dlib
import numpy as np
import sys
import json
import os

try:
    # Check if the correct number of arguments is provided
    if len(sys.argv) != 3:
        print(json.dumps({"error": "Usage: python script.py <mode> <captured_image_path>"}))
        sys.exit()

    mode = sys.argv[1]  # "register" or "verify"
    captured_image_path = sys.argv[2]

    # Path to the models (assuming they are in the same directory as the script)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    face_recognition_model_path = os.path.join(current_dir, "dlib_face_recognition_resnet_model_v1.dat")
    landmark_model_path = os.path.join(current_dir, "shape_predictor_68_face_landmarks.dat")

    # Load the face recognition model
    face_recognition_model = dlib.face_recognition_model_v1(face_recognition_model_path)

    # Load the face landmark predictor
    landmark_predictor = dlib.shape_predictor(landmark_model_path)

    # Load captured image
    captured_img = dlib.load_rgb_image(captured_image_path)

    # Detect faces in the image
    detector = dlib.get_frontal_face_detector()
    faces = detector(captured_img)

    # Check if any faces were found
    if not faces:
        print(json.dumps({"error": "No face detected"}))
        sys.exit()

    # Get face landmarks for the first detected face
    landmarks = landmark_predictor(captured_img, faces[0])

    # Compute face encoding for the first detected face
    captured_encoding = np.array(face_recognition_model.compute_face_descriptor(captured_img, landmarks))

    if mode == "register":
        # Return the face encoding for registration
        output = {"status": "success", "faceData": captured_encoding.tolist()}
    elif mode == "verify":
        # Load stored encoding from standard input (for verification)
        stored_encoding = np.array(json.loads(sys.stdin.read()))
        # Compare faces
        distance = np.linalg.norm(captured_encoding - stored_encoding)
        # Determine if the faces match based on a threshold
        if distance < 0.6:  # Threshold adjustable
            output = {"status": "success", "match": True, "distance": float(distance)}
        else:
            output = {"status": "success", "match": False, "distance": float(distance)}
    else:
        output = {"error": "Invalid mode. Use 'register' or 'verify'."}

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit()

# Print the output as JSON
print(json.dumps(output))