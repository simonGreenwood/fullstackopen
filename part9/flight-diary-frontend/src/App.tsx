import { DiaryEntry, ValidationError } from "./types";
import { useEffect, useState } from "react";

import axios from "axios";
import { getDiaries } from "./services/diaryService";

import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";
const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    getDiaries().then((d) => setDiaries(d));
  });
  return (
    <div>
      <h3>Add new entry</h3>
      <div style={{ color: "red" }}>{errorMessage}</div>
      <NewDiary />
      <h3>Diary Entries</h3>
      {diaries.map((diary) => (
        <Diary diary={diary} key={diary.id} />
      ))}
    </div>
  );
};
export default App;
