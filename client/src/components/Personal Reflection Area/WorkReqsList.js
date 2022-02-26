import React, { useState, useEffect } from "react";
import "./WorkReqsList.css";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { MdOutlineDelete } from "react-icons/md";

function WorkReqsList() {
  const [mustHaves, setMustHaves] = useState([]);
  const [negotiables, setNegotiables] = useState([]);
  const [dealBreakers, setDealBreakers] = useState([]);
  const [niceToHaves, setNicetoHaves] = useState([]);

  //STATES TO RECORD FORM INPUT
  const [type, setType] = useState("must-have");
  const [description, setDescription] = useState("");

  //record and set the input description
  function handleInputChange(e) {
    const value = e.target.value;
    setDescription(value);
  }

  //record and set the priority type
  function handleInputSelection(e) {
    const value = e.target.value;
    setType(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "must-have") {
      fetch("http://localhost:5001/must-have", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          must_haves: description,
        }),
      })
        .then((res) => res.json()) //First transform the JSON to a Javascript object
        .then((json) => {
          setMustHaves(json); //update the list
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "negotiable") {
      fetch("http://localhost:5001/negotiable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          negotiables: description,
        }),
      })
        .then((res) => res.json()) //First transform the JSON to a Javascript object
        .then((json) => {
          setNegotiables(json); //update the list
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "deal-breaker") {
      fetch("http://localhost:5001/dealbreaker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deal_breakers: description,
        }),
      })
        .then((res) => res.json()) //First transform the JSON to a Javascript object
        .then((json) => {
          setDealBreakers(json); //update the list
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "nice-to-have") {
      fetch("http://localhost:5001/nice2have", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nice_to_have: description,
        }),
      })
        .then((res) => res.json()) //First transform the JSON to a Javascript object
        .then((json) => {
          setNicetoHaves(json); //update the list
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //delete a must-have
  const deleteMustHave = (e) => {
    fetch(`http://localhost:5001/must-have/${e.id}`, {
      method: "delete",
    })
      .then((res) => {
        console.log(res);
        console.log(e.id);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setMustHaves(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete a negotiable
  const deleteNegotiable = (e) => {
    fetch(`http://localhost:5001/negotiable/${e.id}`, {
      method: "delete",
    })
      .then((res) => {
        console.log(res);
        console.log(e.id);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setNegotiables(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete a deal-breaker

  const deleteDealbreaker = (e) => {
    fetch(`http://localhost:5001/dealbreaker/${e.id}`, {
      method: "delete",
    })
      .then((res) => {
        console.log(res);
        console.log(e.id);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setDealBreakers(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //delete a nice2have
  const deleteNice2have = (e) => {
    fetch(`http://localhost:5001/nice2have/${e.id}`, {
      method: "delete",
    })
      .then((res) => {
        console.log(res);
        console.log(e.id);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setNicetoHaves(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get all niceToHaves from backEnd
  useEffect(() => {
    fetch("http://localhost:5001/nice2haves-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setNicetoHaves(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Get all dealbreakers from the back-end
  useEffect(() => {
    fetch("http://localhost:5001/dealbreakers-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setDealBreakers(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Get all must-haves from back-end
  useEffect(() => {
    fetch("http://localhost:5001/must-haves-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setMustHaves(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get list of negotiables from backend
  useEffect(() => {
    fetch("http://localhost:5001/negotiables-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setNegotiables(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header></Header>
      <h1 className="priorities-title" id="professional-priorities-title">
        Professional Priorities
      </h1>
      <div className="priorities-menu">
        <div className="add-to-list">
          <h1 id="addNew-title">Add a new priority</h1>
          <form className="add-priorities-form">
            <h2>Select Type:</h2>
            <select
              onChange={handleInputSelection}
              name="priority-type"
              id="select-type-dropdown-menu"
            >
              <option value="must-have">must-have</option>
              <option value="negotiable">negotiable</option>
              <option value="deal-breaker">deal-breaker</option>
              <option value="nice-to-have">nice to have</option>
            </select>
            <h2>Add a description:</h2>
            <input
              className="priorities-input"
              id="priority-description-input"
              onChange={handleInputChange}
            ></input>
            <br />{" "}
            {/*<--remove this later by styling so that submit button is on next line */}
            <Button
              onClick={handleSubmit}
              id="submit-priority-button"
              color="#0090C3"
              variant="solid"
            >
              SUBMIT
            </Button>
          </form>
        </div>
      </div>

      <div className="priorities-main">
        <div className="priorities-list">
          <h1 className="my-list-title">My List</h1>
          <ul id="must-haves-list">
            <h2 className="list-header" id="must-haves-title">
              MUST-HAVES
            </h2>
            {mustHaves.map((e) => (
              <li>
                {" "}
                {e.must_haves}{" "}
                <Button
                  onClick={() => deleteMustHave(e)}
                  leftIcon={<MdOutlineDelete />}
                  color="#0090C3"
                  size="md"
                  variant="ghost"
                >
                  {" "}
                </Button>
              </li>
            ))}
          </ul>

          <ul id="negotiables-list">
            <h2 className="list-header" id="negotiables-title">
              NEGOTIABLES
            </h2>
            {negotiables.map((e) => (
              <li>
                {e.negotiables}
                <Button
                  onClick={() => deleteNegotiable(e)}
                  leftIcon={<MdOutlineDelete />}
                  color="#0090C3"
                  size="md"
                  variant="ghost"
                >
                  {" "}
                </Button>
              </li>
            ))}
          </ul>

          <ul id="dealbreakers-list">
            <h2 className="list-header" id="dealbreakers-title">
              DEAL-BREAKERS
            </h2>
            {dealBreakers.map((e) => (
              <li>
                {e.deal_breakers}{" "}
                <Button
                  onClick={() => deleteDealbreaker(e)}
                  leftIcon={<MdOutlineDelete />}
                  color="#0090C3"
                  size="md"
                  variant="ghost"
                >
                  {" "}
                </Button>
              </li>
            ))}
          </ul>
          <ul id="nice2have-list">
            <h2 className="list-header" id="nice2have-title">
              NICE TO HAVE
            </h2>
            {niceToHaves.map((e) => (
              <li>
                {e.nice_to_have}{" "}
                <Button
                  onClick={() => deleteNice2have(e)}
                  leftIcon={<MdOutlineDelete />}
                  color="#0090C3"
                  size="md"
                  variant="ghost"
                >
                  {" "}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkReqsList;
