import React, { useState } from "react";
import { createDiary } from "../services/diaryService";
import { Visibility, Weather } from "../types";
const NewDiary = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date,
      comment,
      visibility,
      weather,
    }).catch((error) => setErrorMessage(error.response.data));

    setDate("");
    setComment("");
  };
  return (
    <div>
      <h3>Add new entry</h3>
      <div style={{ color: "red" }}>{errorMessage}</div>
      <form onSubmit={(e) => submit(e)}>
        <div>
          date
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            required={true}
          />
        </div>
        <div>
          visibility
          {Object.values(Visibility).map((v) => (
            <>
              <input
                type="radio"
                name="visibility"
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              <label>{v}</label>
            </>
          ))}
        </div>
        <div>
          weather
          {Object.values(Weather).map((w) => (
            <>
              <input
                type="radio"
                name="weather"
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              <label>{w}</label>
            </>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required={true}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};
export default NewDiary;
