import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllDiagnoses } from "../../services/diagnoses";
import { Entry, Diagnosis, EntryFormValues } from "../../types";

import HospitalEntry from "./Entries/HospitalEntry";
import OccupationalEntry from "./Entries/OccupationalEntry";
import HealthCheckEntry from "./Entries/HealthCheckEntry";
import AddEntryModal from "./AddEntryModal";

const EntryDetails = (props: { entry: Entry; diagnoses: Diagnosis[] }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Bad error type: ${JSON.stringify(value)}`);
  };
  switch (props.entry.type) {
    case "Hospital":
      return <HospitalEntry entry={props.entry} diagnoses={props.diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalEntry entry={props.entry} diagnoses={props.diagnoses} />
      );
    case "HealthCheck":
      return (
        <HealthCheckEntry entry={props.entry} diagnoses={props.diagnoses} />
      );
    default:
      return assertNever(props.entry);
  }
};

const Entries = ({
  entries,
  handleSubmit,
}: {
  entries: Entry[];
  handleSubmit: (values: EntryFormValues) => void;
}) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={handleSubmit}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add new entry
      </Button>
    </div>
  );
};
export default Entries;
export interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}
