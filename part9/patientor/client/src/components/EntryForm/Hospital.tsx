import {
  Input,
  InputLabel,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FormikValues } from 'formik';
import { ChangeEventHandler } from 'react';

type Props = {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  values: FormikValues;
};

const Hospital = ({ handleChange, values }: Props) => {
  return (
    <>
      <Typography mt={2} variant="h5">
        Discharge
      </Typography>
      <InputLabel htmlFor="dischargeDate">Date</InputLabel>
      <Input
        onChange={handleChange}
        value={values.dischargeDate}
        name="dischargeDate"
        id="dischargeDate"
        type="dischargeDate"
      />

      <InputLabel htmlFor="criteria">Criteria</InputLabel>
      <Input
        onChange={handleChange}
        value={values.criteria}
        id="criteria"
        name="criteria"
        type="text"
      />
    </>
  );
};

export default Hospital;
