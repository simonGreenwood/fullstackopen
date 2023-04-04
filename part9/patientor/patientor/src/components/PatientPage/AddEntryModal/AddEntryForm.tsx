import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { EntryFormValues, HealthCheckRating, Gender } from "../../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions = Object.entries(HealthCheckRating)
  .filter((x) => isNaN(Number(x[1])))
  .map((rating) => ({
    value: Number(rating[0]),
    label: rating[1],
  }));
console.log(healthCheckRatingOptions);
const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>();
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const healthCheckRating = Object.keys(HealthCheckRating).find(
        (g) => Number(g) === value
      );
      if (healthCheckRating) {
        setHealthCheckRating(Number(healthCheckRating));
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes?.split(" "),
      type: "HealthCheck",
      healthCheckRating: 0,
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Health check rating"
          fullWidth
          value={healthCheckRating.toString()}
          onChange={onHealthCheckRatingChange}
        >
          {healthCheckRatingOptions.map((option) => {
            console.log(option);
            return (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
/*export interface BaseEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  add on the healthCheckRating which can be a number from 0 to 3
} */
