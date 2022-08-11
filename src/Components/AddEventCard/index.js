import "./index.css";
import { useState, useEffect } from "react";

import Navbar from "../Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useNavigate } from "react-router-dom";
import { DocumentScanner } from "@mui/icons-material";

import Places from "../Places/places";

export default function NewEventForm({ onClick }) {
  //Form submission function that reads each input type and adds it to the object to be sent to the server if needed.

  const [value, setValue] = useState("");
  const [tags, setTags] = useState([""]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [coord, setCoord] = useState({ lat: 0, lng: 0 });

  // console.log("these are the coords", coord);

  const navigate = useNavigate();
  // console.log(tags);
  const handleTagChange = (e) => {
    const index = tags.indexOf(e.target.value);
    if (index === -1) {
      setTags([...tags, e.target.value]);
    } else {
      setTags(tags.filter((tag) => tag !== e.target.value));
    }
  };

  function handleName(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setName(value);
  }

  function handleDescription(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setDescription(value);
  }

  function handleSummary(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setSummary(value);
  }

  function handleDate(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    const newVal = Date().toLocaleString(value);
    setDate(newVal);
  }

  function handleTime(event) {
    // This function tracks the string information typed into the input field.
    const value = event.target.value;
    setTime(value);
  }

  let user = {
    username: "Jordan",
    email: "jordan@jordan.com",
    img: "https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg",
  };

  let eventObj = {
    eventName: name,
    eventDescription: summary,
    mainDescription: description,
    date: date,
    time: time,
    organiser: user.username,
    lat: 0,
    lng: 0,
    address: "placeholder",
    img: "url to go here, ask untrodden member",
    email: user.email,
  };

  async function handleSubmission(e) {
    e.preventDefault();
    // ADAPT ALL OF THE BELOW TO MATCH OUR DATA
    document.querySelector(".event-form-container").classList.add("hidden");

    // console.log(eventObj);

    //    /Grabs the 6 current tags to idenitfy checked status. happy to help checkbox is also included but
    //is ignored as is handled later.
    // let tagArr = document.getElementsByClassName("tag-checkbox");
    // for (let i = 0; i < tagArr.length - 1; i++) {
    //   if (tagArr[i].checked) {
    //     noteObj.tags = [...noteObj.tags, tagArr[i].name];
    //     newResourceObj.tags = [...newResourceObj.tags, tagArr[i].name];
    //   }
    // }

    // let tagObj = {tagArr}

    //  All elements have been searched, ready to post the data to the server and database.
    const response = await fetch(`https://turnupdb.herokuapp.com/events/all/`, {
      //
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(eventObj), // body data type must match "Content-Type" header
    });
    console.log("Submission complete");

    return response.json();
  }

  function hideForm() {
    document.querySelector(".event-form-container").classList.add("hidden");
  }

  function test() {
    console.log(eventObj);
  }

  return (
    <div>
      <Navbar></Navbar>

      <div className="form-container">
        <div className="top-left">
          <TextField
            onChange={handleName}
            className="event-title-box"
            sx={{
              width: "35vw",
              height: "5rem",
              // background: "var(--supporting-blue)",
              margin: "auto",
              display: "inline-flex",
            }}
            label="Event title"
            multiline
            rows={2}
            cols={100}
            defaultValue=""
            id="titleArea"
            required
            inputProps={{ maxLength: "40" }}
          />

          <TextField
            onChange={handleSummary}
            className="event-summary-box"
            sx={{
              width: "35vw",
              height: "9.2rem",
              // background: "var(--supporting-blue)",
            }}
            label="Event Summary"
            multiline
            rows={5}
            cols={100}
            defaultValue=""
            id="summaryArea"
            required
            inputProps={{ maxLength: "80" }}
          />

          <TextField
            onChange={handleDescription}
            className="event-description-box"
            sx={{
              width: "35vw",
              height: "15rem",
              // background: "var(--supporting-blue)",
            }}
            label="Event Description"
            multiline
            rows={6}
            cols={100}
            defaultValue=""
            id="decriptionArea"
            required
          />
          {/* <div className="buffer"> </div> */}
        </div>
        <div className="top-right">
          <Places setCoordFunction={setCoord} />
          <div className="date-time-container">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Event date"
                orientation="landscape"
                openTo="day"
                value={date}
                inputFormat="dd.MM.yyyy"
                onChange={(newDate) => {
                  setDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
                // sx={{
                //   width: "auto",
                //   height: "auto",
                // }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                // ampmInClock="false"
                label="Start time"
                orientation="landscape"
                openTo="hours"
                inputFormat="hh:mm"
                value={time}
                onChange={(newTime) => {
                  setTime(newTime);
                }}
                renderInput={(params) => <TextField {...params} />}
                // sx={{
                //   width: "auto",
                //   height: "auto",
                // }}
              />
            </LocalizationProvider>
          </div>
          <div className="tag-area-box">
            <FormControl>
              <FormLabel>Event Tags</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  label="Pet-Friendly"
                  control={<Checkbox value="pet-friendly" />}
                  onChange={handleTagChange}
                />
                <FormControlLabel
                  label="18+"
                  control={<Checkbox value="18+" />}
                  onChange={handleTagChange}
                />
                <FormControlLabel
                  label="Outdoors"
                  control={<Checkbox value="outdoors" />}
                  onChange={handleTagChange}
                />
                <FormControlLabel
                  label="Parking"
                  control={<Checkbox value="parking" />}
                  onChange={handleTagChange}
                />
                <FormControlLabel
                  label="Family-Friendly"
                  control={<Checkbox value="family-friendly" />}
                  onChange={handleTagChange}
                />
              </FormGroup>
            </FormControl>
          </div>
          <div className="buttons">
            <Button
              sx={{
                margin: "auto",
              }}
              variant="contained"
              size="large"
              color="error"
              type="submit"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </Button>
            <Button
              sx={{
                margin: "auto",
              }}
              variant="contained"
              type="submit"
              size="large"
              onClick={test}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
