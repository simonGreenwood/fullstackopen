import WorkIcon from "@mui/icons-material/Work";
import { Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../types";
interface OccupationalEntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalEntryComponent = (props: OccupationalEntryProps) => {
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
      {props.entry.sickLeave && (
        <Typography variant="body2">
          Sick leave: {props.entry.sickLeave.startDate} until{" "}
          {props.entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography variant="body2">
        diagnosed by {props.entry.specialist}
      </Typography>
    </div>
  );
};
export default OccupationalEntryComponent;
