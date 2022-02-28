import e from "cors";
import React, { useState, useEffect } from "react";
import "./MyQandAs.css";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { MdOutlineDelete } from "react-icons/md";

//This component should:
//Have full text searchability
//Display your own q&as visually on cards: question on front, on click displays answer
//have an input form that accepts question, answer, and tag

function MyQandAs() {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([
    { question: "hello", answer: "goodbye" },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [tag, setTag] = useState("");
  const [searchTerms, setSearchTerms] = useState("");

  //set the user questions
  const handleNewQuestion = (e) => {
    let question = e.target.value;
    setNewQuestion(question);
  };

  //set the user answer
  const handleNewAnswer = (e) => {
    let answer = e.target.value;
    setNewAnswer(answer);
  };

  //set the user-input search term
  const handleSearch = (e) => {
    let searchTerm = e.target.value;
    setSearchTerms(searchTerm);
  };

  //show the results of the users search
  const showSearchResults = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5001/q-and-as-list-search/${searchTerms}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json() /*res.json()*/) //First transform the JSON to a Javascript object
      .then((json) => {
        setSearchTerms("");
        setQuestionsAndAnswers(json); //update the list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //add a new q&a to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/q-and-a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: newQuestion,
        answer: newAnswer,
        tag_id: 1,
      }),
    })
      .then((res) => res.json()) //First transform the JSON to a Javascript object
      .then((json) => {
        setNewQuestion("");
        setNewAnswer("");
        setQuestionsAndAnswers(json); //update the list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete a q&a card
  const deleteQA = (e) => {
    fetch(`http://localhost:5001/q-and-a/${e.id}`, {
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
        setQuestionsAndAnswers(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //return to full list view
  const showFullList = () => {
    fetch("http://localhost:5001/q-and-as-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setQuestionsAndAnswers(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Get all the q&as from back-end on load
  useEffect(() => {
    fetch("http://localhost:5001/q-and-as-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setQuestionsAndAnswers(json);
        //(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header> </Header>
      <div className="q-and-a-menu">
        <div id="newQandAform">
          <form className="newQandAform">
            <h2 className="q-a-input-title"> Question: </h2>
            <textarea
              className="q-a-input"
              name="question"
              value={newQuestion}
              onChange={handleNewQuestion}
            ></textarea>
            <h2 className="q-a-input-title"> Answer: </h2>
            <textarea
              className="q-a-input"
              name="answer"
              value={newAnswer}
              onChange={handleNewAnswer}
            ></textarea>{" "}
            <br></br>
            <button className="q-a-button" onClick={handleSubmit}>
              Add to my collection
            </button>
          </form>
        </div>
        <div className="newQandAform" id="searchBar">
          <h1 className="q-a-input-title"> Search: </h1>
          <input
            className="q-a-input"
            name="search"
            value={searchTerms}
            onChange={handleSearch}
          ></input>{" "}
          <button className="q-a-button" onClick={showSearchResults}>
            {" "}
            search
          </button>
          <button className="q-a-button" onClick={showFullList}>
            show all cards
          </button>
        </div>
      </div>

      <div className="q-and-a-main">
        {/*AREA TO DISPLAY Q&AS on FLIPCARDS */}
        <h1 class="card-title">Q&A Collection</h1>
        {questionsAndAnswers.map((e) => (
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <h2>{e.question}</h2>
              </div>
              <div class="flip-card-back">
                <h2>{e.answer}</h2>
                <Button
                  className="deleteQa"
                  leftIcon={<MdOutlineDelete />}
                  color="#ee6327"
                  size="lg"
                  background="transparent"
                  variant="ghost"
                  _hover="blue"
                  onClick={() => deleteQA(e)}
                >
                  {" "}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyQandAs;
