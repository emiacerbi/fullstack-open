import { CoursePart } from '../types';

type Props = {
  courseParts: CoursePart[];
};

const Content = ({ courseParts }: Props) => {
  return (
    <div>
      {courseParts.map((course: CoursePart) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
