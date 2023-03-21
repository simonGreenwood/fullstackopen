import { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import axios from "axios";
import Diary from "./components/Diary";
const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/diaries")
      .then((response) => setDiaries(response.data));
  });
  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map((diary) => (
        <Diary diary={diary} />
      ))}
    </div>
  );
};
export default App;
