import { EntryProps } from "../AllEntries";
const HealthCheckEntry = (props: EntryProps) => {
  return (
    <div
      style={{
        border: "1px black solid",
        paddingTop: "0.5em",
        paddingLeft: "0.5em",
        marginTop: "1em",
        borderRadius: "5px",
      }}
    >
      {props.entry.date}
    </div>
  );
};
export default HealthCheckEntry;
