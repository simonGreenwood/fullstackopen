import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";
import axios from "axios";
export const getAllDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};
