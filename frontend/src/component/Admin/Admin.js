import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Model from "react-modal";
import {
  AddCase,
  setCases,
  updateCases,
  deleteCase,
} from "../../reducer/cases/index";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { Link } from "react-router-dom";
const Admin = () => {
  const [num, setNum] = useState(1);
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [userId, setUserId] = useState("");
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [case_image, setCase_Image] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [TheAmountRequired, setTheAmountRequired] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [message, setMessage] = useState("");
  const [imageselected, setImageSelected] = useState("");
  // ------------------------------------------------

  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "nfrmsteq");
    axios
      .post("https://api.cloudinary.com/v1_1/dxw4t7j0p/image/upload", formData)

      .then((result) => {
        setCase_Image(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
    // ------------------------------------------------

  const getAllCases = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/cases/page?page=${num}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      setMessage("no cases yet");
      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };
    // ------------------------------------------------

  const updateCaseById = async (id) => {
    console.log("idupdate", id);
    try {
      const result = await axios.put(`http://localhost:5000/cases/${id}`, {
        case_image,
        title,
        case_description,TheAmountRequired,
        category,
      });
      console.log(result.data.results);
      dispatch(updateCases(result.data.results));
      getAllCases()
    } catch (error) {
      console.log(error);
    }
  };
    // ------------------------------------------------

  const deleteCseById = async (id) => {
    console.log("idDelete:", id);
    try {
      await axios.delete(`http://localhost:5000/cases/${id}`);
      dispatch(deleteCase(id));
      getAllCases()
    //   navigate(`/allcases`);
    } catch (error) {
      console.log(error);
    }
  };
    // ------------------------------------------------

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return { cases: state.casesReducer.cases, token: state.loginReducer.token };
  });

//   const handleUpdate = (element) => {
//     setUpdateBox(!updateBox);
//     setCaseId(element.id);
//     setCategory(element.category);
//     setTitle(element.title);
//     setCase_Image(element.case_image);
//     setCase_Description(element.case_description);
//     if (updateBox) addNewCase(element.id);
//   };
  // ------------------------------------------------
  const addNewCase = () => {
    axios
      .post(
        "http://localhost:5000/cases",
        { category, case_image, title, case_description, TheAmountRequired },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )

      .then((result) => {
        dispatch(
          AddCase({
            category,
            case_image,
            title,
            case_description,
            TheAmountRequired,
          })
        );
        setMessage("the case has been created successfully");
        // navigate(`/allcases`);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllCases();
  }, []);
    // ------------------------------------------------

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      {" "}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setModelIsOpen(true)}> +</button>
      <table className="table">
        {" "}
        <tr className="head">
          <th>id</th>
          <th> category</th>
          <th>image</th>
          <th>title</th>
          <th>description</th>
          <th>amount</th>
          <th>donation</th>
          <th>donor</th>
          <th>Operations</th>
        </tr>{" "}
        {state.cases &&
          state.cases.map((element, i) => {
            return (
              <tr>
                <td className="allcasesImage">{element.id}</td>
                <td className="allcasesImage">{element.category}</td>
                <td className="allcasesImage">{element.case_image}</td>
                <td className="allcasesTitle">{element.title}</td>
                <td className="allcasesImage">{element.case_description}</td>
                <td className="TheAmountReguired">
                  TheAmountRequired:{element.TheAmountRequired}$
                </td>
                <td className="allcasesImage">{element.donations}</td>
                <td className="allcasesImage">{element.donor}</td>
                <td className="allcasesImage">
                  {" "}
                  <button className="delete" onClick={() => deleteCseById(element.id)}>
                    X
                  </button>{" "}
                   <button className="update" onClick={() => updateCaseById(element.id)}>
                    update
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
      {/* <Link className="case" to="/newcase">
            <a id="new">newCase</a>
          </Link> */}
      {/* <br />
        <br />
              <br /> */}
      <div className="model">
        <Model
          isOpen={modelIsOpen}
          style={customStyles}
          onRequestClose={() => setModelIsOpen(false)}
        >
          <div className="newPage">
            <br />
            <br />
            <br />

            <>
              <input
                className="category"
                type="text"
                placeholder="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></input>
              <br />

              <br />

              <input
                type="file"
                className="image"
                onChange={(e) => {
                  setImageSelected(e.target.files[0]);
                }}
              ></input>

              <button onClick={() => uploadImage(imageselected)}>upload</button>

              <br />
              <br />

              <input
                className="title"
                type="text"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
              <br />
              <br />

              <input
                className="amount"
                type="number"
                placeholder="The amount required"
                onChange={(e) => {
                  setTheAmountRequired(e.target.value);
                }}
              ></input>
              <br />
              <br />

              <textarea
                className="description"
                type="text"
                placeholder="Description"
                onChange={(e) => {
                  setCase_Description(e.target.value);
                }}
              ></textarea>
              <br />
              <br />

              <button className="new" onClick={addNewCase}>
                Add New Case
              </button>
            </>

            {message}
          </div>
        </Model>
      </div>
    </>
  );
};
export default Admin;
