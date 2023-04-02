import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Typography } from "@mui/material";
import { HospitalEntry, Diagnosis } from "../../../types";
interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}
const HospitalEntryComponent = (props: HospitalEntryProps) => {
  console.log(props.entry);
  return (
    <div
      style={{
        border: "1px black solid",
        paddingTop: "0.5em",
        paddingLeft: "0.5em",
        marginTop: "1em",
        borderRadius: "5px",
      }}
    >
      <Typography variant="body1">
        {props.entry.date} <LocalHospitalIcon />
      </Typography>
      <Typography variant="body2">{props.entry.description}</Typography>
      <Typography variant="body2" style={{ paddingTop: "5px" }}>
        Discharge date: {props.entry.discharge.date},{" "}
        {props.entry.discharge.criteria}
      </Typography>
      <Typography variant="body1" style={{ paddingTop: "5px" }}>
        Diagnoses
      </Typography>
      <ul>
        {props.entry.diagnosisCodes &&
          props.entry.diagnosisCodes.map((code) => {
            const theDiagnosis = props.diagnoses.find(
              (diagnosis) => diagnosis.code === code
            );
            if (!theDiagnosis) return <></>;
            return (
              <Typography variant="body2">
                {theDiagnosis.code} {theDiagnosis.name}
              </Typography>
            );
          })}
      </ul>
      <Typography variant="body2">
        Treated by {props.entry.specialist}
      </Typography>
    </div>
  );
};
export default HospitalEntryComponent;
