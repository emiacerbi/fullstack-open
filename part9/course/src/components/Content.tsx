import { CoursePart } from '../types';
import Part from './Part';

type Props = {
  courseParts: CoursePart[];
};

const Content = ({ courseParts }: Props) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </div>
  );
};

export default Content;
