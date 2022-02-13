import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { addVolunteer } from "../../reducer/volunteer/index";
import Model from "react-modal";
import { MdVolunteerActivism } from "react-icons/md";
import { MdOutlineVolunteerActivism } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
const Home = ({
  setCategory,
  setAllCase,
  numEducation,
  numFood,
  setNumFood,
  setNumEducation,
  setNumRebuilding,
  numRebuilding,
  setNumMedicalSupplies,
  numMedicalSupplies,
}) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      volunteers: state.volunteerReducer.volunteers,
    };
  });

  console.log(state.volunteers);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [joinIsOpen, setJoinIsOpen] = useState(false);

  // console.log(firstName);
  // console.log(lastName);
  // console.log(email);
  // console.log(address_1);
  // console.log(phonenumber);

  const countNumEducation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntEdu
 `
      );

      if (res.data.success) {
        setNumEducation(res.data.result[0].countEducation);
      }
    } catch (error) {}
  };

  const countNumFood = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntFood
 `
      );

      if (res.data.success) {
        setNumFood(res.data.result[0].countFood);
      }
    } catch (error) {}
  };
  const countNumRebuilding = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntReb
 `
      );

      if (res.data.success) {
        setNumRebuilding(res.data.result[0].CountRebuilding);
      }
    } catch (error) {}
  };

  const countNumMedSupplies = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntMedSupp
 `
      );

      if (res.data.success) {
        setNumMedicalSupplies(res.data.result[0].CountMedSupplies);
      }
    } catch (error) {}
  };
  useEffect(() => {
    countNumEducation();
  }, []);
  useEffect(() => {
    countNumFood();
  }, []);
  useEffect(() => {
    countNumRebuilding();
  }, []);
  useEffect(() => {
    countNumMedSupplies();
  }, []);

  //------------------------------------------------------------

  const addNewVolunteer = () => {
    axios
      .post(
        "http://localhost:5000/volunteer",
        { firstName, lastName, email, address_1, phonenumber },
        { headers: { Authorization: `Bearer ${state.token}` } }
      )

      .then((result) => {
        dispatch(
          addVolunteer({
            firstName,
            lastName,
            email,
            address_1,
            phonenumber,
          })
        );
        setJoinIsOpen(false);
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.respone.data.message);
      });
  };

  //--------------------------------

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "70%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -100%)",
    },
  };

  return (
    <>
      <header className="headerHome">
        <main className="main">
          <section className="whatDo">
            <h3 id="Welcome">Welcome To Safe House</h3>
            <h1 id="headerWhatDo">
              Donate for <span className="change_content"></span>
            </h1>
            <p id="prgWhatDo">
              {" "}
              If you do not have money, then smiling in the face of your brother
              is charity
            </p>
            <br />
            <br />
            <Link className="register" to="/register">
              <a id="Register">Register</a>
            </Link>
            <Link className="login" to="/login">
              <a id="Login">Login</a>
            </Link>
          </section>
        </main>
      </header>
      <section className="target" id="targetSection">
        <div className="containerTarget">
          <h2 className="headerTarget">safe house target for 2022</h2>
          <div className="boxContainer">
            <div className="box">
              <div className="cardImage"></div>
              <div className="targetTitle">Educating 1000 students</div>
              <div className="targetCount">
                Covered number for this moment:<span>{numEducation} </span>
              </div>
              <Link
                to="/allcases"
                onClick={() => {
                  setCategory(`education`);
                  setAllCase(false);
                }}
              >
                {" "}
                <button className="DonationNow">Donate Now</button>
              </Link>
            </div>

            <div className="box">
              <div className="cardImage"></div>
              <div className="targetTitle">Feeding 1000 poor</div>
              <div className="targetCount">
                Covered number for this moment:<span>{numFood}</span>
              </div>
              <Link
                to="/allcases"
                onClick={() => {
                  setCategory(`food`);
                  setAllCase(false);
                }}
              >
                {" "}
                <button className="DonationNow">Donate Now</button>
              </Link>
            </div>

            <div className="box">
              <div className="cardImage"></div>
              <div className="targetTitle">Repairing 500 facilities</div>
              <div className="targetCount">
                Covered number for this moment:<span>{numRebuilding} </span>
              </div>
              <Link
                to="/allcases"
                onClick={() => {
                  setCategory(`rebuilding`);
                  setAllCase(false);
                }}
              >
                {" "}
                <button className="DonationNow">Donate Now</button>
              </Link>
            </div>

            <div className="box">
              <div className="cardImage"></div>
              <div className="targetTitle">
                Medical Supplies for 1000 person
              </div>
              <div className="targetCount">
                Covered number for this moment:
                <span>{numMedicalSupplies} </span>
              </div>
              <Link
                to="/allcases"
                onClick={() => {
                  setCategory(`Medical Supplies`);
                  setAllCase(false);
                }}
              >
                {" "}
                <button className="DonationNow">Donate Now</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* //----------- */}
      <div className="SectionVolunteering" id="volunteeringSection">
        <div className="containerVolunteering">
          <div className="volunteeringTitle">
            <h1>Volunteer with us</h1>
          </div>
          <div className="contentVolunteering">
         
            <div className="quotation">
            <h3>
                Be a volunteer to Make your presence in this life more beautiful
              </h3>
              <br/>
              <p className="prgVolunteering">
                When you do any volunteer work, you will not know the meaning of
                boredom. Everything in the world of volunteering is an exciting
                and new experience in all respects that takes you to wide
                horizons.
              </p>
              <div className="btnVolunteering">
                <a
                  onClick={() => {
                    setJoinIsOpen(true);
                  }}
                >
                  JOIN US
                </a>
              </div>
            </div>
          </div>
          <div className="DivImageVolunteering">
            <img src="./image/vol1.jpg" />
          </div>
          <div className="iconVolunteering">
            <a>
              <MdVolunteerActivism></MdVolunteerActivism>{" "}
            </a>
            <a>
              <MdOutlineVolunteerActivism></MdOutlineVolunteerActivism>{" "}
            </a>
            <a>
              <FaHandHoldingHeart></FaHandHoldingHeart>{" "}
            </a>
          </div>
          {/* <div className="volunteeringCont">
            <h3 className="ektabas">
              Be a volunteer to
              <br />{" "}
              <strong>
                {" "}
                Make your presence in this life more beautiful
              </strong>{" "}
            </h3>
            <p className="prgVolunteering">
              When you do any volunteer work, you will not know the meaning of
              boredom. Everything in the world of volunteering is an exciting
              and new experience in all respects that takes you to wide
              horizons.
            </p> */}

          <Model
            isOpen={joinIsOpen}
            style={customStyles}
            onRequestClose={() => {
              setJoinIsOpen(false);
            }}
          >
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Address"
              onChange={(e) => {
                setAddress_1(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            ></input>
            <button onClick={addNewVolunteer}>Add New Volunteer</button>
          </Model>

          {message}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
