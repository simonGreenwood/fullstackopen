import { useState } from "react";
import { createDiary } from "../services/diaryService";

const NewDiary = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const submit = () => {
    createDiary({
      date,
      visibility,
      weather,
      comment,
    });
  };
  return (
    <div>
      <form onSubmit={submit}>
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
