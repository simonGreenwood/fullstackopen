import { CoursePart } from "../types";
import Part from "./Part";
interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part: CoursePart) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
