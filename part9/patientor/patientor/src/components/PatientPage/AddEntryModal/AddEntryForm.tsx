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

import {
  EntryFormValues,
  HealthCheckRating,
  Entry,
  BaseEntry,
  SickLeave,
  Discharge,
} from "../../../types";
import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";

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
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
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
    const baseEntry: Omit<BaseEntry, "id"> = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes?.split(" "),
    };
    if (entryType === "HealthCheck") {
      onSubmit({
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating,
      });
    }
    if (entryType === "OccupationalHealthcare") {
      onSubmit({
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName,
        sickLeave,
      });
    }
    if (entryType === "Hospital") {
      onSubmit({
        ...baseEntry,
        type: "Hospital",
        discharge,
      });
    }
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName("");
    setSickLeave({ startDate: "", endDate: "" });
    setDischarge({ date: "", criteria: "" });
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
        >
          {typeOptions.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>General info</InputLabel>
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
        {entryType === "OccupationalHealthcare" && (
          <OccupationalHealthcare
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
            employer={employerName}
            setEmployer={setEmployerName}
          />
        )}
        {entryType === "Hospital" && (
          <>
            <Hospital discharge={discharge} setDischarge={setDischarge} />
          </>
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
