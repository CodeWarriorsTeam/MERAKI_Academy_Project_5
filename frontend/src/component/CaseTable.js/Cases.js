import React from "react";
import axios from "axios";
import "./cases.css";
import { useDispatch, useSelector } from "react-redux";
import { addImage, setImages } from "../../reducer/image/index";
import { setUsers } from "../../reducer/users/index";

import { useEffect, useState } from "react";
import { setCases } from "../../reducer/cases";
import { useNavigate } from "react-router-dom";
import Model from "react-modal";
import { BiEdit, BiUpload } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { GrLinkNext, GrFormNextLink, GrUpdate } from "react-icons/gr";
import { MdOutlineVolunteerActivism, MdOutlineCases } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBinLine, RiImageAddLine } from "react-icons/ri";
import { AddCase, deleteCase, updateCases } from "../../reducer/cases";
import { Link } from "react-router-dom";
const Cases = ({
  searchCase,
  setInputEmergency1,
  inputEmergency1,
  setInputEmergency2,
  inputEmergency2,
}) => {
  const [num, setNum] = useState(1);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [case_image, setCase_Image] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [TheAmountRequired, setTheAmountRequired] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [message, setMessage] = useState("");
  const [imageselected, setImageSelected] = useState("");
  const [numUser, setNumUser] = useState(0);
  const [numPage, setNumPage] = useState(1);
  const [image_1, setImage_1] = useState("");
  const [imageIsOpen, setImageIsOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return { token: state.loginReducer.token, cases: state.casesReducer.cases };
  });
  //----------------------------------------------------------
  const getAllImage = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/gallery
     `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      if (res.data.success) {
        dispatch(setUsers(res.data.result));
        // setGallery(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllImage();
  }, []);
  //----------------------------------------------------------
  const addNewImage = () => {
    axios
      .post(
        "http://localhost:5000/gallery",
        { image_1 },
        { headers: { Authorization: `Bearer ${state.token}` } }
      )

      .then((result) => {
        // console.log(image_1);
        dispatch(
          addImage({
            image_1,
          })
        );
        getAllImage();
        setImageIsOpen(false);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  //----------------------------------------------------------

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
  //----------------------------------------------------------
  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "nfrmsteq");
    axios
      .post("https://api.cloudinary.com/v1_1/dxw4t7j0p/image/upload", formData)

      .then((result) => {
        setCase_Image(result.data.secure_url);
        setImage_1(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  console.log(inputEmergency1);
  //------------------------------------------------------------
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
        return setMessage(error.response.data.message);
      }
    }
  };
  //---------------------------------------------------------------------------
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
  //------------------------------------------------------------------------------
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
  //------------------------------------------------------------------------------------
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
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const customStyles3 = {
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

  useEffect(() => {
    getAllCases();
  }, [numPage]);
  return (
    <div className="all">
      <div className="link22">
        <ul>
          {" "}
          <RiImageAddLine className="imageLink6"></RiImageAddLine>{" "}
          <p
            onClick={() => {
              setImageIsOpen(true);
              console.log(imageIsOpen);
            }}
            className="imageIcon6"
            title="Add Image"
          >
            {" "}
            Add Image
          </p>
          <BsPlusCircle
            onClick={() => setModelIsOpen(true)}
            className="add"
          ></BsPlusCircle>
          <MdOutlineCases className="caseicon2"></MdOutlineCases>{" "}
          <li>
            {" "}
            <Link className="caselink2" to="/admin/cases">
              Cases
            </Link>
          </li>
          <FiUsers className="usericon2"></FiUsers>{" "}
          <li>
            {" "}
            <Link className="userlink2" to="/admin/users">
              Users
            </Link>
          </li>
          <MdOutlineVolunteerActivism className="volicon2"></MdOutlineVolunteerActivism>{" "}
          <li>
            {" "}
            <Link className="voluntlink2" to="/admin/volunteers">
              Volunteers
            </Link>
          </li>
        </ul>
      </div>
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
          <th className="oper">
            Actions
            {/* <RiArrowUpDownFill className="arrow"></RiArrowUpDownFill> */}
          </th>
          <th style={{ fontSize: "0.7em" }}>Emergency1</th>
          <th style={{ fontSize: "0.7em" }}>Emergency2</th>
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
                    <td className="req"> {element.TheAmountRequired}</td>
                    <td className="imag">{element.case_image}</td>
                    <td
                      className="descr"
                      style={{
                        wordBreak: "break-all",
                        width: "500px",
                      }}
                    >
                      {element.case_description.split(" ")[0]}
                      {console.log(element.case_description.split(" ,"))}
                    </td>
                    <td className="donation">{element.donations}</td>
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
                    <td className={element.id}>
                      {inputEmergency1 == 20 ? (
                        <input
                          onClick={() => {
                            setInputEmergency1(element.id);
                          }}
                          type="checkbox"
                        />
                      ) : element.id == inputEmergency1 ? (
                        <>
                          <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp>
                        </>
                      ) : (
                        <input
                          onClick={() => {
                            setInputEmergency1(element.id);
                            localStorage.setItem("emergencyId1", element.id);
                          }}
                          type="checkbox"
                        />
                      )}
                    </td>
                    <td className={element.id}>
                      {inputEmergency2 == 23 ? (
                        <input
                          onClick={() => {
                            setInputEmergency2(element.id);
                          }}
                          type="checkbox"
                        />
                      ) : element.id == inputEmergency2 ? (
                        <>
                          <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp>
                        </>
                      ) : (
                        <input
                          onClick={() => {
                            setInputEmergency2(element.id);
                            localStorage.setItem("emergencyId2", element.id);
                          }}
                          type="checkbox"
                        />
                      )}
                    </td>
                    <div>
                      <Model
                        style={customStyles3}
                        isOpen={imageIsOpen}
                        onRequestClose={() => setImageIsOpen(false)}
                      >
                        <input
                          type="file"
                          className="imaget"
                          onChange={(e) => {
                            setImageSelected(e.target.files[0]);
                          }}
                        ></input>
                        <button
                          onClick={() => uploadImage(imageselected)}
                          className="uploadImageButton"
                        >
                          {" "}
                          <BiUpload className="uploadIcon"></BiUpload>
                        </button>
                        <button onClick={addNewImage} className="addImage">
                          Add Image
                        </button>
                      </Model>
                    </div>
                    <div className="model">
                      <Model
                        isOpen={modelIsOpen}
                        style={customStyles}
                        onRequestClose={() => setModelIsOpen(false)}
                      >
                        <div className="newPage">
                   <br />
                          <>
                            <input
                              className="category"
                              type="text"
                              placeholder="Category"
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
                              placeholder="Amount"
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
                            <button
                              className="uplo"
                              onClick={() => uploadImage(imageselected)}
                            >
                              {" "}
                              <BiUpload className="uploadIcon"></BiUpload>
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
                              New Case
                            </button>
                            <br />
                            <br />
                          </>

                          {message}
                        </div>
                      </Model>
                    </div>
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
      </button>
    </div>
  );
};
export default Cases;
