import { useState, useEffect, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  SelectChangeEvent,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";

import {
  EntryFormValues,
  HealthCheckRating,
  Entry,
  BaseEntry,
  SickLeave,
  Discharge,
  Diagnosis,
} from "../../../types";
import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";
import { getAllDiagnoses } from "../../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const typeOptions = ["HealthCheck", "OccupationalHealthcare", "Hospital"];
const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<Diagnosis[]>([]);

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
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
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  useEffect(() => {
    getAllDiagnoses().then((allDiagnoses) => setDiagnoses(allDiagnoses));
  }, []);
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
      diagnosisCodes: diagnoses?.map((d) => d.code),
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
    setDiagnoses([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName("");
    setSickLeave({ startDate: "", endDate: "" });
    setDischarge({ date: "", criteria: "" });
    onCancel();
  };

  const handleDiagnosesChange = (
    event: SelectChangeEvent<typeof selectedDiagnoses>
  ) => {
    if (!diagnoses) return;
    console.log(diagnoses, event.target.value[0]);
    const diagnosisToAdd = diagnoses.find(
      (diagnosis) => diagnosis.code === event.target.value[0]
    );
    console.log(diagnosisToAdd);
    if (!diagnosisToAdd) return;
    setSelectedDiagnoses(selectedDiagnoses.concat(diagnosisToAdd));
    console.log(selectedDiagnoses, diagnoses);
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
        {/*
        <Select
          fullWidth
          multiple
          value={selectedDiagnoses}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                console.log(value);
                return <Chip key={value.code} label={value.code} />;
              })}
            </Box>
          )}
          onChange={handleDiagnosesChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Diagnosis codes" />
          }
        >
          {diagnoses &&
            diagnoses.map((d) => {
              return (
                <MenuItem key={d.code} value={d.code}>
                  {d.code} - {d.name}
                </MenuItem>
              );
            })}
          </Select> */}
        <Select
          fullWidth
          multiple
          value={selectedDiagnoses}
          onChange={handleDiagnosesChange}
          input={<OutlinedInput label="Name" />}
        >
          {diagnoses &&
            diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.name}>
                {diagnosis.code} {diagnosis.name}
              </MenuItem>
            ))}
        </Select>
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
  diagnoses?: Array<Diagnosis["code"]>;
  add on the healthCheckRating which can be a number from 0 to 3
} */
