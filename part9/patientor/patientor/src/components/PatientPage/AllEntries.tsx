import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllDiagnoses } from "../../services/diagnoses";
import { Entry, Diagnosis } from "../../types";
import HospitalEntry from "./Entries/HospitalEntry";
import OccupationalEntry from "./Entries/OccupationalEntry";
import HealthCheckEntry from "./Entries/HealthCheckEntry";

const EntryDetails = (props: { entry: Entry; diagnoses: Diagnosis[] }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Bad error type: ${JSON.stringify(value)}`);
  };
  switch (props.entry.type) {
    case "Hospital":
      return <HospitalEntry entry={props.entry} diagnoses={props.diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={props.entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={props.entry} />;
    default:
      return assertNever(props.entry);
  }
};

const Entries = ({ entries }: { entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  useEffect(() => {
    getAllDiagnoses().then((allDiagnoses) => setDiagnoses(allDiagnoses));
  }, []);
  return (
    <div>
      <Typography
        variant="h6"
        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
      >
        <strong>entries</strong>
      </Typography>
      {diagnoses &&
        entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
    </div>
  );
};
export default Entries;
export interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}
