import { EntryProps } from "../AllEntries";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
const HealthCheckEntry = (props: EntryProps) => {
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
      {props.entry.date} <MedicalServicesIcon />
    </div>
  );
};
export default HealthCheckEntry;
