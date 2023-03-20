import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.part.kind) {
    case "basic":
      return (
        <div style={{paddingBottom: 10}}>
          <div><strong>{props.part.name} {props.part.exerciseCount}</strong></div>
          <i>{props.part.description}</i>
        </div>
      );
    case "group":
      return (
        <div style={{paddingBottom: 10}}>
          <div><strong>{props.part.name} {props.part.exerciseCount}</strong></div>
          group exercises: {props.part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div style={{paddingBottom: 10}}>
          <div><strong>{props.part.name} {props.part.exerciseCount}</strong></div>
          <div><i>{props.part.description}</i></div>
          <div>background material: {props.part.backroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div style={{paddingBottom:10}}>
          <div><strong>{props.part.name} {props.part.exerciseCount}</strong></div>
          <div><i>{props.part.description}</i></div>
          <div>requirements: {props.part.requirements.join(", ")}</div>
        </div>
      )
    default:
      return assertNever(props.part)

  }
};
export default Part;
