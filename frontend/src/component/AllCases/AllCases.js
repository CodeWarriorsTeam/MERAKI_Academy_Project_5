import React, { useEffect, useState } from "react";
import axios from "axios";
import { setCases, updateCases } from "../../reducer/cases";
import { useDispatch, useSelector } from "react-redux";
const AllCases = (token) => {
  const [casee, setCase] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
    };
  });
  useEffect(() => {
    getAllCases();
  }, []);
  const getAllCases = async (num = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/cases/page?page=${num}
 `,
        { headers: { Authoriztion: `bearer ${state.token}` } }
      );
      if (res.data.success) {
        dispatch(setCases(res.date.message));
        setCase(res.data.cases);
      } else throw Error;
    } catch (error) {
      if (!error) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
    
  };
  const handleUpdateClick = (casee) => {
    setUpdateBox(!updateBox);
    setCaseId(casee.id);
    setTitle(casee.title);
    setImage(casee.image);
    setDescription(casee.description);
    if (updateBox) updateCases(casee.id);
  };

  const updateCaseById = async (id) => {
    try {
      await axios
        .put(`http://localhost:5000/cases/${id}`, {
          title,
          image,
          description,
        })
        .then((result) => {
          dispatch(updateCases(result.data.results));
          getAllCases();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {state.cases &&
        state.cases.map((casee, i) => {
          <div key={i} className="case">
            <div>{casee.title}</div>
            <div>{casee.case_image}</div>
            <div>{casee.case_description}</div>
            {casee.author === userId && (
              <>
                {updateBox && caseId === casee.id && (
                  <form>
                    <br />
                    <input
                      type="text"
                      defaultValue={casee.title}
                      placeholder="case title here"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />

                    <textarea
                      placeholder="case description here"
                      defaultValue={casee.description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </form>
                )}
                <button onClick={() => handleUpdateClick(casee)}>update</button>
              </>
            )}
          </div>;
        })}

      {message && <div>{message}</div>}
    </>
  );
};

export default AllCases;
