import { DiaryEntry } from "../types";
interface DiaryEntryProps {
  diary: DiaryEntry;
}
const Diary = (props: DiaryEntryProps) => {
  return (
    <div style={{ paddingBottom: 10 }}>
      <h4>{props.diary.date}</h4>
      <i>{props.diary.comment}</i>
      <div>visibility: {props.diary.visibility}</div>
      <div>weather: {props.diary.weather}</div>
    </div>
  );
};
export default Diary;
