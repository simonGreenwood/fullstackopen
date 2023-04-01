import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import GenderIcon from "./GenderIcon";
import Entries from "./Entries";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (!id) return;
    console.log(id);
    patientService
      .getOne(id)
      .then((p) => {
        setPatient(p);
      })
      .catch((error) => setErrorMessage(error.response.data));
  }, [id]);

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }
  if (!patient) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
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
      <Entries entries={patient.entries} />
    </div>
  );
};
export default PatientPage;
