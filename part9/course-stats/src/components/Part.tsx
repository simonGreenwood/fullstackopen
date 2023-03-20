import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <strong>{props.part.name}</strong>
          <p>
            <i>{props.part.description}</i>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <strong>{props.part.name}</strong>
          <p>group exercises {props.part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <strong>{props.part.name}</strong>
          <p>
            <i>{props.part.description}</i>
          </p>
          {props.part.backroundMaterial}
        </div>
      );
  }
};
export default Part;
