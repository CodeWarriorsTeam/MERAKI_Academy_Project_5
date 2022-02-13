import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCases, updateCases, deleteCase } from "../../reducer/cases/index";
import { useNavigate } from "react-router-dom";
import "./AllCases.css";
import { GrFormNextLink } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineArrowUp } from "react-icons/ai";

const AllCases = ({
  searchCase,
  categoryNav,
  allCase,
  isAdmin,
  setNum,
  num,
  setNumEducation,
  numEducation,
  setNumFood,
}) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
    };
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const [category, setCategory] = useState("");

  const [case_image, setCase_image] = useState("");
  const [title, setTitle] = useState("");
  const [case_description, setCase_Description] = useState("");

  const [message, setMessage] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [userId, setUserId] = useState("");

  const getAllCases = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/cases/page?page=${num}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      console.log(res.data.result);
      if (!res.data.result) {
        if (num == 0) {
          setNum(num + 1);
        } else {
          setNum(num - 1);
        }
      }
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      if (num == 0) {
        setNum(num + 1);
      } else {
        setNum(num - 1);
      }

      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  const convertToCase = (id) => {
    navigate(`/casedetails/${id}`);
  };

  const getAllCasesByCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/cases/page/category?page=${num}&category=${categoryNav}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      if (!res.data.result) {
        if (num == 0) {
          setNum(num + 1);
        } else {
          setNum(num - 1);
        }
      }
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      if (num == 0) {
        setNum(num + 1);
      } else {
        setNum(num - 1);
      }

      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (categoryNav) {
      getAllCasesByCategory();
    }
  }, [categoryNav, num]);

  useEffect(() => {
    if (allCase) {
      getAllCases();
    }
  }, [allCase, num]);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setVisible(true);
    } else if (scrolled <= 100) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      <br />
      <br />
      <br />
      <section className="allCasesSection">
        <div className="containerAllCases">
          <div className="row my-3">
            <div className="col my-3">
              {/* <h1 className="headerAllCases">
                Goodness does not stop until the Hour of Resurrection
              </h1> */}
              {/* <p className="prgAllCases">
                "If the Final Hour comes while you have a shoot of a plant in
                your hands and it is possible to plant it before the Hour comes,
                you should plant it"
              </p> */}
            </div>
          </div>

          <div className="row-cases">
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
                .map((element, i) => (
                  <>
                    <div key={i} className="col-cases" >
                      <div  className="containerCase outline">
                   <img
                          className="caseImage"
                          title="Case Image"
                          onClick={() => {
                            convertToCase(element.id);
                          }}
                          src={element.case_image}
                        />
                        {element.TheAmountRequired &&
                        element.TheAmountRequired > 0 ? (
                          <>
                            <a className="donationNow">Open</a>
                          </>
                        ) : (
                          <a
                            className="donationNow"
                            style={{ background: "red" }}
                          >
                            close
                          </a>
                        )}
                      </div>
                      <p className="titleCase">{element.title}</p>
                      <h6 className="required">{element.TheAmountRequired}$</h6>
                      <div className="contBtn">
                      <div className="BtnDetailsCase"  onClick={() => {
                          convertToCase(element.id);
                        }}>
                  Details
                      </div>
                      </div>
                      {/* <button className="detailsCase"
                        onClick={() => {
                          convertToCase(element.id);
                        }}
                        title="Case Details"
                      >
                        Details
                      </button> */}
                    </div>
                    {/* <div className="caseInfo"> */}
                    {/* <p className="allcasesTitle">{element.title}</p>
                    <p className="TheAmountReguired">
                      {element.TheAmountRequired}$
                    </p> */}
                    {/* {element.TheAmountRequired &&
                    element.TheAmountRequired > 0 ? (
                      <>
                        <a className="donationNow">Open</a>
                      </>
                    ) : (
                      <a className="donationNow" style={{ background: "red" }}>
                        close
                      </a>
                    )} */}

                    {/* </div> */}
                  </>
                ))}
          </div>
        </div>
      </section>

      {num == 1 ? (
        <></>
      ) : (
        <button
          onClick={() => {
            setNum(num - 1);
          }}
          className="backPaginationButton"
        >
          <IoMdArrowBack className="backButtonIcon"></IoMdArrowBack>
        </button>
      )}
      <button
        className="pageinationButton"
        onClick={() => {
          setNum(num + 1);
        }}
      >
        <GrFormNextLink className="buttonIcon"></GrFormNextLink>
      </button>

      {/* {message && <div>{message}</div>}
      <button className="up"><AiOutlineArrowUp onClick={scrollToTop} style={{display: visible ? 'inline':'none', fontSize:"1.8em"}}></AiOutlineArrowUp></button> */}
      {/* <ul className="smothscroll"><li><a href="#scrool"><AiOutlineArrowUp className="up">::before</AiOutlineArrowUp></a> </li></ul> */}
    </>
  );
};

export default AllCases;
