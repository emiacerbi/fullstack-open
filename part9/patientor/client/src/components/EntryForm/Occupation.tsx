import { Input, InputLabel, Typography } from '@mui/material';
import { FormikValues } from 'formik';
import { ChangeEventHandler } from 'react';

type Props = {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  values: FormikValues;
};

const Occupation = ({ handleChange, values }: Props) => {
  return (
    <>
      <Typography mt={2} variant="h5">
        Sick leave
      </Typography>
      <InputLabel htmlFor="startingDate">Starting date</InputLabel>
      <Input
        onChange={handleChange}
        value={values.startingDate}
        id="startingDate"
        type="startingDate"
        name="startingDate"
      />

      <InputLabel htmlFor="endingDate">Ending date</InputLabel>
      <Input
        onChange={handleChange}
        value={values.endingDate}
        id="endingDate"
        type="endingDate"
        name="endingDate"
      />

      <InputLabel htmlFor="employer">Employer&apos;s name</InputLabel>
      <Input
        onChange={handleChange}
        value={values.employer}
        name="employer"
        id="employer"
        type="text"
      />
    </>
  );
};

export default Occupation;
