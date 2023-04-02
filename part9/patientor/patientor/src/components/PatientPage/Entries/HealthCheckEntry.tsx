import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Typography } from "@mui/material";

import { HealthCheckEntry } from "../../../types";
interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}
const HealthCheckEntryComponent = (props: HealthCheckEntryProps) => {
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
        {props.entry.date} <MedicalServicesIcon />
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
export default HealthCheckEntryComponent;
