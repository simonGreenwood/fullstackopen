import { SickLeave } from "../../../types";
import { TextField, InputLabel } from "@mui/material";
interface OccupationalHealthcareProps {
  sickLeave: SickLeave;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
  employer: string;
  setEmployer: React.Dispatch<React.SetStateAction<string>>;
}
const OccupationalHealthcare = (props: OccupationalHealthcareProps) => {
  return (
    <div>
      <InputLabel style={{ marginTop: 8 }}>Employer</InputLabel>
      <TextField
        label="Employer"
        placeholder="Employer"
        fullWidth
        required={true}
        value={props.employer}
        onChange={({ target }) => props.setEmployer(target.value)}
      />
      <InputLabel style={{ marginTop: 8 }}>
        <u>Sick Leave (optional)</u>
      </InputLabel>
      <InputLabel size={"small"} style={{ paddingBottom: "1em" }}>
        Start date
      </InputLabel>
      <TextField
        type={"date"}
        fullWidth
        value={props.sickLeave.startDate}
        onChange={({ target }) =>
          props.setSickLeave({ ...props.sickLeave, startDate: target.value })
        }
      />
      <InputLabel size={"small"} style={{ paddingBottom: "1em" }}>
        End date
      </InputLabel>
      <TextField
        type={"date"}
        fullWidth
        value={props.sickLeave.endDate}
        onChange={({ target }) =>
          props.setSickLeave({ ...props.sickLeave, endDate: target.value })
        }
      />
    </div>
  );
};
export default OccupationalHealthcare;
