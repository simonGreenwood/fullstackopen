import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import MaleIcon from "@mui/icons-material/Male";
import { Gender } from "../../types";

const GenderIcon = (props: { gender: Gender }) => {
  if (props.gender === "male") {
    return <MaleIcon />;
  } else if (props.gender === "female") {
    return <FemaleIcon />;
  } else if (props.gender === "other") {
    return <TransgenderIcon />;
  }
  return <div></div>;
};
export default GenderIcon;
