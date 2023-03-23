import React, { useState } from "react";
import { createDiary } from "../services/diaryService";
const NewDiary = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date,
      visibility,
      weather,
      comment,
    }).catch((error) => setErrorMessage(error.response.data));
  };
  return (
    <div>
      <h3>Add new entry</h3>
      <div style={{ color: "red" }}>{errorMessage}</div>
      <form onSubmit={(e) => submit(e)}>
        <div>
          date
          <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          weather
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          comment
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};
export default NewDiary;
