import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setUsers } from "../../reducer/users/index";
import { useEffect } from "react";

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
    <>
      <table>
        <br />
        <br />
        <br /> <br /> <br />
        <tr>
          <th>id</th>
          <th>profile_image</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>country</th>
          <th>email</th>
        </tr>
        {state.users &&
          state.users.map((element, i) => {
            // console.log();
            return (
              <div key={i}>
                <tr>
                  <td>{element.id}</td>
                  <td>{element.profile_image}</td>
                  <td>{element.firstName}</td>
                  <td>{element.lastName}</td>
                  <td>{element.country}</td>
                  <td>{element.email}</td>
                </tr>

                {/* <Model
              style={customStyles2}
              isOpen={userIsOpen}
              onRequestClose={() => setUserIsOpen(false)}
            >
              {" "}
            </Model> */}
              </div>
            );
          })}
      </table>
    </>
  );
};

export default Users;
