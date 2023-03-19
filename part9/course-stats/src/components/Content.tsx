import { CoursePart } from "../types";
interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  /* <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p> */
  return (
    <div>
      {props.courseParts.map((part: CoursePart) => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
