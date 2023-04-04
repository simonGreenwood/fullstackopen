import { Discharge } from "../../../types";
import { InputLabel, TextField } from "@mui/material";
interface HospitalProps {
  discharge: Discharge;
  setDischarge: React.Dispatch<React.SetStateAction<Discharge>>;
}
const Hospital = (props: HospitalProps) => {
  return (
    <div>
      <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={props.discharge.date}
        onChange={({ target }) =>
          props.setDischarge({ ...props.discharge, date: target.value })
        }
      />
      <InputLabel style={{ marginTop: 8 }}>Discharge criteria</InputLabel>
      <TextField
        label="Criteria"
        fullWidth
        value={props.discharge.criteria}
        onChange={({ target }) =>
          props.setDischarge({ ...props.discharge, criteria: target.value })
        }
      />
    </div>
  );
};
export default Hospital;
