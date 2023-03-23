import { DiaryEntry, NewDiaryEntry } from "../types";
import axios from "axios";

const baseUrl = "http://localhost:3001/api/diaries";
export const createDiary = (
  object: NewDiaryEntry,
  handleError: (error: any) => any
) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

export const getDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then((response) => response.data)
    .catch((error) => error);
};
