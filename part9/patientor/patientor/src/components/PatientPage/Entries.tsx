import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllDiagnoses } from "../../services/diagnoses";
import { Entry, Diagnosis } from "../../types";

const Entries = ({ entries }: { entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  useEffect(() => {
    getAllDiagnoses().then((allDiagnoses) => setDiagnoses(allDiagnoses));
  }, []);
  const getDiagnosisFromCode = (code: string) => {
    if (!diagnoses) return;
    return diagnoses.find((diagnosis) => diagnosis.code === code) || null;
  };
  return (
    <div>
      <Typography
        variant="h6"
        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
      >
        <strong>entries</strong>
      </Typography>
      {entries.map((entry) => (
        <div key={entry.id}>
          <Typography>
            {entry.date} <i>{entry.description}</i>
          </Typography>
          <ul>
            {entry.diagnosisCodes &&
              diagnoses &&
              entry.diagnosisCodes.map((code) => (
                <li>
                  <Typography variant="body2" key={code}>
                    {code} {getDiagnosisFromCode(code)?.name}
                  </Typography>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default Entries;
