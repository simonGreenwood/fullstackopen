import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";

import GenderIcon from "./GenderIcon";

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
      <h1>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h1>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation}
    </div>
  );
};
export default PatientPage;
