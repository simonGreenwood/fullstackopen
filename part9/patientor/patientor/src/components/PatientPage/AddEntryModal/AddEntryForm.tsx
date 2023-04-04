import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  SelectChangeEvent,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { EntryFormValues, HealthCheckRating, Entry } from "../../../types";
import HealthCheck from "./HealthCheck";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const typeOptions = ["HealthCheck", "OccupationalHealthcare", "Hospital"];
const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");
  const [healthCheckRating, setHealthCheckRating] = useState(
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

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      if (
        value === "HealthCheck" ||
        value === "OccupationalHealthcare" ||
        value === "Hospital"
      ) {
        setEntryType(value);
      }
    }
  };
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes?.split(" "),
      type: "HealthCheck",
      healthCheckRating,
    });
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setHealthCheckRating(HealthCheckRating.Healthy);
    onCancel();
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Health check rating</InputLabel>
        <Select
          label="Entry type"
          fullWidth
          value={entryType.toString()}
          onChange={onTypeChange}
          style={{ marginBottom: 20 }}
        >
          {typeOptions.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
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
        {entryType === "HealthCheck" && (
          <HealthCheck
            onHealthCheckRatingChange={onHealthCheckRatingChange}
            healthCheckRating={healthCheckRating}
          />
        )}
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
