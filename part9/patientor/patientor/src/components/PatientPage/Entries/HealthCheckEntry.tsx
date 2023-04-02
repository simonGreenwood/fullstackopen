import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";

import { HealthCheckEntry } from "../../../types";
interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
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
      <Typography variant="body2">
        diagnosed by {props.entry.specialist}
      </Typography>
    </div>
  );
};
export default HealthCheckEntryComponent;
