import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";
const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (!id) return;
    console.log(id);
    patientService.getOne(id).then((p) => {
      console.log(p);
      setPatient(p);
      console.log(patient);
    });
  }, [id]);

  if (!patient) {
    return <div>loading</div>;
  }
  return (
    <div>
      <h1>{patient.name}</h1>
    </div>
  );
};
export default PatientPage;
