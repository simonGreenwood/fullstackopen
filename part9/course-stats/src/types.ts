interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescription extends CoursePartBase {
  description: string;
}
interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackround extends CoursePartDescription {
  backroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround;
