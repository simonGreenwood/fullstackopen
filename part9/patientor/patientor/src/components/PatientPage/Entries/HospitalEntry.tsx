import { EntryProps } from "../AllEntries";
const HospitalEntry = (props: EntryProps) => {
  console.log(props.entry);
  return (
    <div>
      <div>Hospital Entry!</div>
    </div>
  );
};
export default HospitalEntry;
