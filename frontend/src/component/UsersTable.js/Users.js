import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUsers } from "../../reducer/users/index";
import { useEffect } from "react";
import { MdOutlineVolunteerActivism ,MdOutlineCases} from "react-icons/md";
import {FiUsers} from "react-icons/fi"
import "./users.css";
const Users = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return { token: state.loginReducer.token, users: state.usersReducer.users };
  });

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/user/all
         `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      if (res.data.success) {
        dispatch(setUsers(res.data.result));
        // setUserIsOpen(false);
        console.log(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="all">
      <br />
      <table className="table">
        <>
          <ul>
            <br />{" "}
          <MdOutlineCases className="casicon"></MdOutlineCases>  <Link className="caselink3" to="/admin/cases">
              Cases
            </Link>
            <br />{" "}
          <FiUsers className="usicon"></FiUsers>  <Link className="userlink3" to="/admin/users">
              Users
            </Link>
            <br /> <MdOutlineVolunteerActivism className="volicon"></MdOutlineVolunteerActivism>
            <Link className="voluntlink3" to="/admin/volunteers">
              Volunteers
            </Link>
          </ul>
        </>
        <tr>
          <th className="id">id</th>
          <th className="img2">profile_image</th>
          <th className="first">firstName</th>
          <th className="last">lastName</th>
          <th className="co">country</th>
          <th className="em">email</th>
        </tr>
        {state.users &&
          state.users.map((element, i) => {
            // console.log();
            return (
              <tr className="tttt">
                <td className="id2">{element.id}</td>
                <td className="imag2">{element.profile_image}</td>
                <td className="first2">{element.firstName}</td>
                <td className="last2">{element.lastName}</td>
                <td className="cont2">{element.country}</td>
                <td className="ema2">{element.email}</td>
              </tr>
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
    </div>
  );
};

export default Users;
