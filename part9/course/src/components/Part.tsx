import { CoursePart } from '../types';

type Props = {
  course: CoursePart;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const italic = {
  fontStyle: 'italic',
};

const Part = ({ course }: Props) => {
  switch (course.kind) {
    case 'background':
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p style={italic}>{course.description}</p>
          <p>{course.backroundMaterial}</p>
        </div>
      );
    case 'basic':
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p style={italic}>{course.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>project exercises {course.groupProjectCount}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p style={italic}>{course.description}</p>
          <p>
            required skills: {course.requirements[0]}, {course.requirements[1]}
          </p>
        </div>
      );
    default:
      return assertNever(course);
  }
};

export default Part;
