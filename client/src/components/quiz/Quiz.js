import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";
import Fade from "react-reveal/Fade";
import Header from "../Header";
import Footer from "../Footer";
import Login from "../Login";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Center,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Box,
} from "@chakra-ui/react";

const StartQuiz = (props) => {
  let token = localStorage.getItem("token");
  return (
    <div>
      {/* <Header setTabIndex={props.setTabIndex} tabIndex={props.tabIndex} /> */}
      <center>
        <Fade bottom>
          {token ? (
            <form className="page">
              <Center display="block" alignItems="center">
                <h1>Time to ace a quiz!</h1>
                <Box
                  alignItems="flex"
                  className="Topic"
                  bg="#BFE8F3"
                  borderRadius="1rem"
                  padding="2rem"
                  maxWidth="600px"
                >
                  <h1>Topic:</h1>
                  <RadioGroup onChange={props.setTopic} value={props.topic}>
                    <Stack>
                      <Radio
                        name="topc"
                        colorScheme="orange"
                        value="HTML"
                        defaultChecked
                      >
                        HTML
                      </Radio>
                      <Radio
                        name="topc"
                        colorScheme="orange"
                        value="JavaScript"
                      >
                        JavaScript
                      </Radio>
                      <Radio name="topc" colorScheme="orange" value="MySQL">
                        MySQL
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <br />
                <Box
                  className="Level"
                  bg="#BFE8F3"
                  borderRadius="1rem"
                  padding="2rem"
                  maxWidth="600px"
                >
                  <h1>Level:</h1>

                  <RadioGroup onChange={props.setLevel} value={props.level}>
                    <Stack>
                      <Radio
                        name="level"
                        colorScheme="orange"
                        value="Easy"
                        defaultChecked
                      >
                        Easy
                      </Radio>
                      <Radio name="level" colorScheme="orange" value="Medium">
                        Medium
                      </Radio>
                      <Radio name="level" colorScheme="orange" value="Hard">
                        Hard
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <br />
                <Box
                  className="Length"
                  bg="#BFE8F3"
                  borderRadius="1rem"
                  padding="2rem"
                  maxWidth="600px"
                >
                  <h1>Number of questions:</h1>
                  <Slider
                    defaultValue={20}
                    min={5}
                    max={20}
                    step={5}
                    id="Length"
                    name="Length"
                    aria-label="Number of quiz questions"
                    colorScheme="orange"
                    onChangeEnd={(value) => props.setLength(value)}
                    alignContent="center"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <br />

                  <p className="center">{props.length} questions</p>

                  <Link to="/quiz/play">
                    <Button type="submit" value="Quiz Me">
                      Quiz Me
                    </Button>
                  </Link>
                </Box>
              </Center>
            </form>
          ) : (
            <center>
              {" "}
              <p className="center">
                You must be logged in to access this page:
              </p>
              <Login />
            </center>
          )}
          <Footer />
        </Fade>
      </center>
    </div>
  );
};

export default StartQuiz;
