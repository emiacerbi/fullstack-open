import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Dispatch, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DIAGNOSIS_CODES, ENTRIES } from '../../constants';
import useEntryForm from '../../hooks/useEntryForm';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import Occupation from './Occupation';

type Props = {
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
};

type CurrentEntry = {
  name: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
  value: string;
};

const EntryForm = ({ setIsFormVisible }: Props) => {
  const formStyle = {
    border: '2px dashed black',
    padding: '1rem',
  };

  const { id } = useParams();

  const [currentEntry, setCurrentEntry] = useState(ENTRIES[0]);

  const {
    formik,
    handleChangeDiagnosis,
    diagnosisCode,
    handleAddDiagnosis,
    setDiagnosisCodes,
    diagnosisCodes,
  } = useEntryForm(id as string, currentEntry as CurrentEntry);

  return (
    <form style={formStyle} onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography variant="body1">Entry</Typography>
        {ENTRIES.map((entry) => (
          <Button
            size="small"
            sx={{ textTransform: 'none' }}
            onClick={() => {
              setCurrentEntry(entry);
              formik.resetForm();
            }}
            key={entry.value}
            variant={currentEntry === entry ? 'contained' : 'outlined'}
          >
            {entry.name}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input
          name="description"
          id="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />

        <InputLabel htmlFor="date">Date</InputLabel>
        <Input
          name="date"
          id="date"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.date}
        />

        <InputLabel htmlFor="specialist">Specialist</InputLabel>
        <Input
          id="specialist"
          type="text"
          name="specialist"
          onChange={formik.handleChange}
          value={formik.values.specialist}
        />

        <InputLabel id="diagnosisCodes-label">Diagnosis codes</InputLabel>

        <Select
          labelId="diagnosisCodes-label"
          id="diagnosisCodes"
          value={diagnosisCode}
          onChange={handleChangeDiagnosis}
          label="Diagnosis code"
          variant="standard"
          type="number"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {DIAGNOSIS_CODES.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>

        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button
            sx={{ maxWidth: 150 }}
            disabled={!diagnosisCode}
            onClick={handleAddDiagnosis}
            variant="contained"
            size="small"
          >
            Add code
          </Button>

          <Button
            sx={{ maxWidth: 150 }}
            disabled={!diagnosisCode}
            onClick={() => setDiagnosisCodes([])}
            variant="contained"
            color="warning"
            size="small"
          >
            Reset
          </Button>

          <Typography>Codes:</Typography>

          {diagnosisCodes.length === 0 && (
            <Typography>No codes added</Typography>
          )}
          {diagnosisCodes.map((code) => (
            <Typography
              sx={{ border: '1px dashed black', padding: '.25rem' }}
              key={code}
            >
              {code}
            </Typography>
          ))}
        </Box>

        {currentEntry.value === 'healthCheck' ? (
          <HealthCheck
            handleChange={formik.handleChange}
            values={formik.values}
          />
        ) : currentEntry.value === 'hospital' ? (
          <Hospital handleChange={formik.handleChange} values={formik.values} />
        ) : (
          <Occupation
            handleChange={formik.handleChange}
            values={formik.values}
          />
        )}

        <Box display="flex" mt={1}>
          <Button
            onClick={() => setIsFormVisible(false)}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" sx={{ marginLeft: 'auto' }} variant="contained">
            Add
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default EntryForm;
