import { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";
interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}
const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/api/diaries")
        .then((response) => setDiaries(response.data));
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log(error.status);
        console.log(error.response);
      } else {
        console.error(error);
      }
    }
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
