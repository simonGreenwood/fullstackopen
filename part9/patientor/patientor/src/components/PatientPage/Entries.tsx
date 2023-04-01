import { Typography } from "@mui/material";
import { Entry } from "../../types";

const Entries = ({ entries }: { entries: Entry[] }) => {
  console.log(entries);
  return (
    <div>
      <Typography
        variant="h6"
        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
      >
        <strong>entries</strong>
      </Typography>
      {entries.map((entry) => (
        <div>
          <Typography>
            {entry.date} <i>{entry.description}</i>
          </Typography>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code) => (
                <li>
                  <Typography variant="body2">{code}</Typography>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default Entries;
