import { DiaryEntry } from "./types";
import { useEffect, useState } from "react";

import { getDiaries } from "./services/diaryService";

import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";
const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getDiaries().then((d) => setDiaries(d));
  });
  return (
    <div>
      <NewDiary />
      <h3>Diary Entries</h3>
      {diaries.map((diary) => (
        <Diary diary={diary} key={diary.id} />
      ))}
    </div>
  );
};
export default App;
