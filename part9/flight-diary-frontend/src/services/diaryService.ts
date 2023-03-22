import { DiaryEntry, NewDiaryEntry } from "../types";
import axios from "axios";

const baseUrl = "http://localhost:3001/api/diaries";
export const createDiary = (object: NewDiaryEntry) => {
  return axios.get<DiaryEntry>(baseUrl).then((response) => response.data);
};

export const getDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};
