import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Model from "react-modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setVolunteers } from "../../reducer/volunteer";


const Volunteers = ()=>{
    const dispatch = useDispatch();

    const state = useSelector((state) => {
      return { token: state.loginReducer.token, volunteers: state.volunteerReducer.volunteers };
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
  <>
  <br/>
  <br/>
  <br/>
  
  <table>
  <tr>
    <th>id</th>
    <th>firstName</th>
    <th>lastName</th>
    <th>email</th>
    <th>address</th>
    <th>phonenumber</th>
  </tr>
  {state.volunteers &&
    state.volunteers.map((element) => {
      return (
        <tr>
          <td>{element.id}</td>
          <td>{element.firstName}</td>
          <td>{element.lastName}</td>
          <td>{element.email}</td>
          <td>{element.address_1}</td>
          <td>{element.phonenumber}</td>
        </tr>
      );
    })}
</table>
</>
)

}

export default Volunteers;