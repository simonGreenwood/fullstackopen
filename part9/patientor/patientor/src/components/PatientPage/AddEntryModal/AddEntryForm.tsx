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
  useTheme,
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const typeOptions = ["HealthCheck", "OccupationalHealthcare", "Hospital"];
const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const theme = useTheme();
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
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
    const diagnosisToAdd = diagnoses.find(
      (diagnosis) =>
        diagnosis.name === event.target.value[event.target.value.length - 1]
    );
    if (!diagnosisToAdd) {
      console.log("error with the diagnosis");
      return;
    }
    setSelectedDiagnoses(selectedDiagnoses.concat(diagnosisToAdd.code));
    if (selectedDiagnoses.includes(diagnosisToAdd.code)) {
      const filtered = selectedDiagnoses.filter(
        (d) => d !== diagnosisToAdd.code
      );
      setSelectedDiagnoses(filtered);
    }
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
          fullWidth
          required={true}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <InputLabel style={{ marginTop: 8 }}>Date</InputLabel>
        <TextField
          fullWidth
          value={date}
          type={"date"}
          required={true}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 8 }}>Specialist</InputLabel>
        <TextField
          fullWidth
          value={specialist}
          required={true}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 8 }}>Diagnosis codes</InputLabel>
        <Select
          fullWidth
          multiple
          value={selectedDiagnoses}
          onChange={handleDiagnosesChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                return <Chip key={value} label={value} color="primary" />;
              })}
            </Box>
          )}
        >
          {diagnoses &&
            diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.name}>
                {diagnosis.code} {diagnosis.name}{" "}
                {selectedDiagnoses.indexOf(diagnosis.code) === -1}
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
