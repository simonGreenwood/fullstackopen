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
      <InputLabel style={{ marginTop: 20 }}>Employer</InputLabel>
      <TextField
        label="Employer"
        placeholder="Employer"
        fullWidth
        value={props.employer}
        onChange={({ target }) => props.setEmployer(target.value)}
      />
      <InputLabel style={{ marginTop: 8 }}>Sick Leave (optional)</InputLabel>
      <TextField
        label="Start date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={props.sickLeave.startDate}
        onChange={({ target }) =>
          props.setSickLeave({ ...props.sickLeave, startDate: target.value })
        }
      />
      <TextField
        label="End date"
        placeholder="YYYY-MM-DD"
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
