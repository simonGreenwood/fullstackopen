import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";

import { HealthCheckEntry, Diagnosis } from "../../../types";
interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}
const HealthCheckEntryComponent = (props: HealthCheckEntryProps) => {
  const generateHeartStyle = (rating: Number) => {
    if (rating === 0) return "green";
    else if (rating === 1) return "yellow";
    else if (rating === 2) return "orange";
    else if (rating === 3) return "red";
    else return "black";
  };
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
        {props.entry.date} <MedicalServicesIcon />
      </Typography>
      <Typography variant="body2">
        <i>{props.entry.description}</i>
      </Typography>
      <FavoriteIcon
        style={{
          color: generateHeartStyle(props.entry.healthCheckRating),
        }}
      />
      {props.entry.diagnosisCodes && (
        <Typography variant="body1" style={{ paddingTop: "5px" }}>
          Diagnoses
        </Typography>
      )}
      <ul>
        {props.entry.diagnosisCodes &&
          props.entry.diagnosisCodes.map((code) => {
            const theDiagnosis = props.diagnoses.find(
              (diagnosis) => diagnosis.code === code
            );
            if (!theDiagnosis) return <></>;
            return (
              <Typography variant="body2" key={theDiagnosis.code}>
                {theDiagnosis.code} {theDiagnosis.name}
              </Typography>
            );
          })}
      </ul>
      <Typography variant="body2">
        diagnosed by {props.entry.specialist}
      </Typography>
    </div>
  );
};
export default HealthCheckEntryComponent;
