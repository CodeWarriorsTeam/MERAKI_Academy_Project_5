import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit, BiUpload } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { GrLinkNext, GrFormNextLink, GrUpdate } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";

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
const Admin = ({ searchCase }) => {
  const [num, setNum] = useState(1);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [userId, setUserId] = useState("");
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [case_image, setCase_Image] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [TheAmountRequired, setTheAmountRequired] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [message, setMessage] = useState("");
  const [imageselected, setImageSelected] = useState("");
  const [numUser, setNumUser] = useState(0);
  const [numPage, setNumPage] = useState(1);
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
        `http://localhost:5000/admin/page?page=${numPage}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      if (!res.data.success) {
        setNumPage(numPage - 1);
      }
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      setMessage("no cases yet");
      if (!error) {
        console.log(888888);
        return setMessage(error.response.data.message);
      }
    }
  };
  // ------------------------------------------------
  const updateCaseById = async (id) => {
    try {
      const result = await axios.put(`http://localhost:5000/cases/${id}`, {
        case_image,
        title,
        case_description,
        TheAmountRequired,
        category,
      });
      dispatch(updateCases(result.data.results));
      getAllCases();
      setUpdateIsOpen(false);
      navigate(`/admin`);
    } catch (error) {
      console.log(error.response);
    }
  };
  // ------------------------------------------------

  const deleteCseById = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cases/${id}`);
      dispatch(deleteCase(id));
      getAllCases();
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
        getAllCases();
        setMessage("the case has been created successfully");
        setModelIsOpen(false);
        navigate(`/admin`);

        // navigate(`/allcases`);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllCases();
  }, [numPage]);
  // ------------------------------------------------
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "70%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const customStyles2 = {
    content: {
      //   background: "rgba(yellow, 0, 0, 0.7)",
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  // ------------------------------------------------
  const conutUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntUser
`
      );

      if (res.data.success) {
        setNumUser(res.data.result[0].CountUser);
      }
    } catch (error) {}
  };
  useEffect(() => {
    conutUsers();
  }, []);
  return (
    <div className="alll">
      {" "}
      <br />
      <br />
      <br />
      <FiUsers className="countUser"></FiUsers>{" "}
      <p className="countUserPrg">{numUser}</p>
      {/* <p className="alert">
        {(alert = "add New Case")} */}
        <AiOutlinePlusCircle
          onClick={() => setModelIsOpen(true)}
          className="plus"  title="add new case"
        ></AiOutlinePlusCircle>
      {/* </p> */}
      <br />
      <br />
      <br />
      <table className="table">
        {" "}
        <tr className="head">
          <th className="id">
            id
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>
          <th className="categor">
            {" "}
            category
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>
          <th className="tit1">
            title
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>
          <th className="amout">
            amount
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>
          <th className="img2">
            image
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>
          <th className="descr">
            description{" "}
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>

          <th className="donatio">
            donation
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>
          <th className="don">
            donor
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>
          <th className="oper">
            Actions
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>
        </tr>{" "}
        {state.cases &&
          state.cases
            .filter((caseInformation) => {
              if (searchCase == "") {
                return caseInformation;
              } else if (
                caseInformation.category
                  .toLowerCase()
                  .includes(searchCase.toLowerCase()) ||
                caseInformation.title
                  .toLowerCase()
                  .includes(searchCase.toLowerCase())
              ) {
                return caseInformation;
              }
            })
            .map((element, i) => {
              return (
                <>
                  <tr key={i} className="ttt">
                    <td className="id">{element.id}</td>
                    <td className="categor">{element.category}</td>
                    <td className="tit">{element.title}</td>
                    <td className="req"> {element.TheAmountRequired} $</td>
                    <td className="imag">{element.case_image}</td>
                    <td className="descr">{element.case_description}</td>

                    <td className="donation">{element.donations}</td>
                    <td className="donor">{element.donor}</td>
                    <td className="button">
                      {" "}
                      <RiDeleteBinLine
                        onClick={() => deleteCseById(element.id)}
                        className="deleteIcon"
                      />{" "}
                      <BiEdit
                        onClick={() => {
                          setUpdateIsOpen(true);
                          setCaseId(element.id);
                        }}
                        className="editIcon"
                      />
                    </td>
                    <div>
                      <Model
                        style={customStyles2}
                        isOpen={updateIsOpen}
                        onRequestClose={() => setUpdateIsOpen(false)}
                      >
                        <input
                          type="text"
                          placeholder="category"
                          defaultValue={element.category}
                          onChange={(e) => setCategory(e.target.value)}
                        ></input>{" "}
                        <br />
                        <br />
                        <input
                          type="file"
                          className="image"
                          onChange={(e) => {
                            setImageSelected(e.target.files[0]);
                          }}
                        ></input>
                        <button onClick={() => uploadImage(imageselected)}>
                          <BiUpload className="upload1"></BiUpload>
                        </button>
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="title"
                          defaultValue={element.title}
                          onChange={(e) => setTitle(e.target.value)}
                        ></input>{" "}
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="description"
                          defaultValue={element.case_description}
                          onChange={(e) => setCase_Description(e.target.value)}
                        ></input>{" "}
                        <br />
                        <br />
                        <input
                          type="text"
                          placeholder="amount"
                          defaultValue={element.TheAmountRequired}
                          onChange={(e) => setTheAmountRequired(e.target.value)}
                        ></input>{" "}
                        <br />
                        <br />
                        <button
                          className="update1"
                          onClick={() => updateCaseById(caseId)}
                        >
                          <GrUpdate
                            style={{ width: "95%", height: "1.4em" }}
                          ></GrUpdate>
                        </button>
                        <br />
                      </Model>
                    </div>
                  </tr>
                </>
              );
            })}
      </table>
      {numPage == 1 ? (
        <></>
      ) : (
        <button
          className="back"
          onClick={() => {
            setNumPage(numPage - 1);
          }}
        >
          <IoMdArrowBack className="backIcon"></IoMdArrowBack>
        </button>
      )}
      <button
        onClick={() => {
          setNumPage(numPage + 1);
        }}
        className="next"
      >
        <GrFormNextLink style={{ width: "1.3em" }}></GrFormNextLink>
        {/* <GrLinkNext className="nextIcon"></GrLinkNext> */}
      </button>
      <div className="model">
        <Model
          isOpen={modelIsOpen}
          style={customStyles}
          onRequestClose={() => setModelIsOpen(false)}
        >
          <div className="newPage">
            {/* 
            <br />
            <br /> */}
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
                className="title"
                type="text"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>{" "}
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
              <input
                type="file"
                className="image22"
                onChange={(e) => {
                  setImageSelected(e.target.files[0]);
                }}
              ></input>
              <button className="uplo" onClick={() => uploadImage(imageselected)}>
                {" "}
                <BiUpload className="uploadIcon" ></BiUpload>
              </button>
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
                new Case
              </button>
              <br /><br />
            </>

            {message}
          </div>
        </Model>
      </div>
    </div>
  );
};
export default Admin;
