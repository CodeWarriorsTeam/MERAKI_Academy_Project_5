import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//////
const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [profile_image, setProfile_image] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [imageselected, setImageSelected] = useState("");
  const [role_id, setRole_id] = useState(2);

  // regex -> regular expression -> email is valid : b@b no
  // regex -> regular expression -> password is valid : 1234BABSjdn , length = 6
  // Check length -> IBAN
  // so important

  console.log(profile_image);
  console.log(imageselected);

  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "nfrmsteq");
    axios
      .post("https://api.cloudinary.com/v1_1/dxw4t7j0p/image/upload", formData)

      .then((result) => {
        setProfile_image(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const checkFormValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,8}(.[a-z{3,8}])?/g;


    
    if (regEx.test(email) && email!=null && firstName!= "" && lastName!="" && country != "") {
      register()
    }
 
 
 
    // if (email != null) {
      
    //   register();
    // }
  };

  const register = () => {
    axios
      .post(`http://localhost:5000/user`, {
        firstName,
        lastName,
        country,
        profile_image,
        email,
        pass,
        role_id
      })
      .then((result) => {
        setParagraph("The user has been created successfully");
        navigate("/login");
      })
      .catch((err) => {
        setParagraph("Error happend while register, please try again");
      });
  };
  return (
    <>
      <br />
      <br />
      <br />
      <div className="registerPage">
        <br />
        <h1 className="signup">Sign Up</h1>
        <h5 className="account">Signup your account</h5>
        <br></br>

        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder="First Name"
          className="firstName"
        ></input>
        <br />
        <br />
        <input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          placeholder="Last Name"
          className="lastName"
        ></input>
        <br />
        <br />
        <input
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          type="text"
          placeholder="Country"
          className="country"
        ></input>

        <br />
        <br />

        <br />

        <input
          type="file"
          className="imageFile"
          onChange={(e) => {
            setImageSelected(e.target.files[0]);
          }}
        ></input>

        <button
          className="uploadButton"
          onClick={() => uploadImage(imageselected)}
        >
          upload
        </button>

        <br />
        <br />

        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
          className="email"
        ></input>
        <br />
        <br />
        <input
          onChange={(e) => {
            setPass(e.target.value);
          }}
          type="password"
          placeholder="Password"
          className="password"
        ></input>
        <br />
        <br />
        <button onClick={checkFormValidation} className="registerButton">
          Sign Up
        </button>
        <br></br>
        <p>{paragraph}</p>
        <br></br>
        <p className="sent">
          Already have an account?{" "}
          <Link className="login" to="/login" className="link">
            Return to Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
