import React from "react";
import axios from "axios";
import "./cases.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCases } from "../../reducer/cases";
import { useNavigate } from "react-router-dom";
import Model from "react-modal";
import { BiEdit, BiUpload } from "react-icons/bi";
import { GrLinkNext, GrFormNextLink, GrUpdate } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteCase, updateCases } from "../../reducer/cases";
import { Link } from "react-router-dom";
const Cases = ({searchCase}) => {
  const [num, setNum] = useState(1);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [case_image, setCase_Image] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [TheAmountRequired, setTheAmountRequired] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [message, setMessage] = useState("");
  const [imageselected, setImageSelected] = useState("");
  const [numUser, setNumUser] = useState(0);
  const [numPage, setNumPage] = useState(1);
  const [image_1, setImage_1] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return { token: state.loginReducer.token, cases: state.casesReducer.cases };
  });


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

  return (
      <div className="all">
      <br/>
      <br/>
      <>
        <ul>
        <li> <Link  className="caselink2" to="/admin/cases">Manage Cases</Link></li>

      <li>  <Link className="userlink2" to="/admin/users">Manage Users</Link></li>
       <li> <Link className="voluntlink2" to="/admin/volunteers">Manage Volunteers</Link></li>
        </ul>
        </>
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
    <br/>
      <br/><br/>
      <br/><br/>
      <br/><br/>
      <br/><br/>
      <br/><br/>
      <br/><br/>

    </div>
  );
};
export default Cases;
