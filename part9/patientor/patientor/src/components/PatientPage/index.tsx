import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient, EntryFormValues } from "../../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Alert } from "@mui/material";
import GenderIcon from "./GenderIcon";
import Entries from "./AllEntries";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [errorMessage, setErrorMessage] = useState("");
  const setErrorWithTimeout = (message: string, timeout: number = 2000) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, timeout);
  };
  useEffect(() => {
    if (!id) return;
    console.log(id);
    patientService
      .getOne(id)
      .then((p) => {
        setPatient(p);
      })
      .catch((error) => setErrorWithTimeout(error.response.data));
  }, [id]);

  const handleSubmit = async (values: EntryFormValues) => {
    try {
      if (!patient) {
        setErrorWithTimeout("No patient");
        return;
      }
      const entries = await patientService.addEntry(values, patient.id);
      setPatient({ ...patient, entries });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setErrorWithTimeout(message);
        } else {
          console.log(e);
          setErrorWithTimeout("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setErrorWithTimeout("Unknown error");
      }
    }
  };

  if (!patient) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Typography
        variant="h5"
        style={{ marginTop: "1em", marginBottom: "0.5em" }}
      >
        <strong>{patient.name}</strong> <GenderIcon gender={patient.gender} />
      </Typography>
      <Typography variant="body1">
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </Typography>
      <Entries entries={patient.entries} handleSubmit={handleSubmit} />
    </div>
  );
};
export default PatientPage;
