import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Model from "react-modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setVolunteers } from "../../reducer/volunteer";
import { Link } from "react-router-dom";
import { MdOutlineVolunteerActivism ,MdOutlineCases} from "react-icons/md";
import {FiUsers} from "react-icons/fi"

import "./volunteer.css";
const Volunteers = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      volunteers: state.volunteerReducer.volunteers,
    };
  });

  const getAllVolunteers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/volunteer
      `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      if (res.data.success) {
        dispatch(setVolunteers(res.data.result));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllVolunteers();
  }, []);

  return (
    <div className="all2">
      <ul>
        <MdOutlineCases className="casicon7"></MdOutlineCases>
          {" "}
          <Link className="caselink7" to="/admin/cases">
            {" "}
            Cases
          </Link>
      
       <FiUsers className="usicon7"></FiUsers>
          {" "}
          <Link className="userlink7" to="/admin/users">
            {" "}
            Users
          </Link>
      <MdOutlineVolunteerActivism className="volicon7"></MdOutlineVolunteerActivism>

          {" "}
          <Link className="voluntlink7" to="/admin/volunteers">
            {" "}
            Volunteers
          </Link>
       
      </ul>
      {/* <br/>      <br/>
      <br/>
      <br/>
      <br/> */}

      <table className="table1">
        <tr >
          <th className="id3">id</th>
          <th className="first3">firstName</th>
          <th className="last3">lastName</th>
          <th className="em3">email</th>
          <th className="addres3">address</th>
          <th className="phone3">phonenumber</th>
        </tr>
        {state.volunteers &&
          state.volunteers.map((element) => {
            return (
              <>
                <tr className="tt">
                  <td className="id4">{element.id}</td>
                  <td className="first4">{element.firstName}</td>
                  <td className="last4">{element.lastName}</td>
                  <td className="em4">{element.email}</td>
                  <td className="addres4">{element.address_1}</td>
                  <td className="phone4">{element.phonenumber}</td>
                </tr>{" "}
              </>
            );
          })}
      </table>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Volunteers;
