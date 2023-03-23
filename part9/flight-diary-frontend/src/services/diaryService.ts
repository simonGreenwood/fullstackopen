import { DiaryEntry, NewDiaryEntry } from "../types";
import axios, { AxiosError } from "axios";

const baseUrl = "http://localhost:3001/api/diaries";
export const createDiary = async (object: NewDiaryEntry) => {
  console.log(object);
  try {
    return await axios.post<DiaryEntry>(baseUrl, object);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const e: Error = error as Error;
      throw e;
    } else {
      throw new Error("error with error");
    }
  }
};

export const getDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};
