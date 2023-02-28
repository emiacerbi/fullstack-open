import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FormikValues } from 'formik';

type Props = {
  handleChange: (event: SelectChangeEvent<FormikValues>) => void;
  values: FormikValues;
};

const HealthCheck = ({ handleChange, values }: Props) => {
  return (
    <>
      <Typography mt={2} variant="h5">
        Health check
      </Typography>
      <InputLabel id="diagnosisCodes-label">Healthcheck Rating</InputLabel>

      <Select
        labelId="healthCheckRating-label"
        id="healthCheckRating"
        name="healthCheckRating"
        value={values.healthCheckRating}
        onChange={handleChange}
        label="Age"
        variant="standard"
        type="text"
      >
        <MenuItem value={'Healthy'}>Healthy</MenuItem>
        <MenuItem value={'LowRisk'}>Low risk</MenuItem>
        <MenuItem value={'HighRisk'}>High risk</MenuItem>
        <MenuItem value={'CriticalRisk'}>Critical risk</MenuItem>
      </Select>
    </>
  );
};

export default HealthCheck;
