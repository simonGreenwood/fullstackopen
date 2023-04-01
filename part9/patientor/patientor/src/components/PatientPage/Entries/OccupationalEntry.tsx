import WorkIcon from "@mui/icons-material/Work";
import { Typography } from "@mui/material";
import { OccupationalHealthcareEntry, Diagnosis } from "../../../types";
export interface OccupationalEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalEntry = (props: OccupationalEntryProps) => {
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
        {props.entry.date} <WorkIcon /> {props.entry.employerName}
      </Typography>
      <Typography variant="body2">
        <i>{props.entry.description}</i>
      </Typography>
      <Typography variant="body2">
        diagnosed by {props.entry.specialist}
      </Typography>
    </div>
  );
};
export default OccupationalEntry;
