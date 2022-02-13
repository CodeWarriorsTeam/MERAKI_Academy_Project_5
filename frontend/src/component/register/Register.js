import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiUpload } from "react-icons/bi";

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

    if (
      regEx.test(email) &&
      email != null &&
      pass != "" &&
      firstName != "" &&
      lastName != "" &&
      country != ""
    ) {
      register();
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
        role_id,
      })
      .then((result) => {
        setParagraph("The user has been created successfully");
        navigate("/login");
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        setParagraph(err.response.data.message);
        // setParagraph("Error happend while register, please try again");
      });
  };
  return (
    <>
      <div className="registerPage">
        <br />
        <div className="">
          {" "}
          <p className="welcome">Welcome Back!</p>
      
          <p className="word"> To keep connected with us please 
          </p><p className="word2">login with your personal info</p>
        </div>
        <br />
        <h1 className="signup">Create Account</h1>
        {/* <h5 className="accountUp">Sign up your account</h5> */}
        <br></br>

        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder=" First Name"
          className="firstName"
        ></input>
        <br />
        <br />
        <input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          placeholder=" Last Name"
          className="lastName"
        ></input>
        <br />
        <br />
        <input
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          type="text"
          placeholder=" Country"
          className="country"
        ></input>

        <br />
        <br />
        <input
          type="file"
          className="image"
          style={{ width: "23%" }}
          onChange={(e) => {
            setImageSelected(e.target.files[0]);
          }}
        ></input>
        <button
          onClick={() => uploadImage(imageselected)}
          className="uploadButton"
        >
          <BiUpload></BiUpload>
        </button>
        <br />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder=" Email"
          className="email"
        ></input>
        <br />
        <br />
        <input
          onChange={(e) => {
            setPass(e.target.value);
          }}
          type="password"
          placeholder=" Password"
          className="password"
        ></input>
        <br />
        <br />
        <button onClick={checkFormValidation} className="registerButton">
          SIGN UP
        </button>
        <br />
        <br />
        <p className="message">{paragraph}</p>
        <button className="sent1">
          <Link className="login" to="/login" className="link">
            SIGN IN
          </Link>
        </button>
      </div>
    </>
  );
};

export default Register;
