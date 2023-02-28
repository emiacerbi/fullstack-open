import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientSercvice from '../../services/patients';
import { Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import EntryDetails from '../EntryDetails';
import EntryForm from '../EntryForm';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      patientSercvice
        .findById(id)
        .then((res) => setPatient(res))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, []);

  const icon =
    patient?.gender === 'male' ? (
      <MaleIcon />
    ) : patient?.gender === 'female' ? (
      <FemaleIcon />
    ) : (
      <EmojiEmotionsIcon />
    );

  if (loading) {
    return <CircularProgress />;
  }

  if (!patient) {
    return <p>No patient found</p>;
  }

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2>{patient.name}</h2>
        <div>{icon}</div>
      </Box>

      <p>ssn: {patient.ssn}</p>
      <p>ocupation: {patient.occupation}</p>

      {isFormVisible ? (
        <EntryForm setIsFormVisible={setIsFormVisible} />
      ) : (
        <Button
          variant="contained"
          color="success"
          onClick={() => setIsFormVisible(true)}
        >
          New entry
        </Button>
      )}

      <h3>entries</h3>

      {patient.entries.length === 0 && <p>No entries for this user</p>}

      <Stack sx={{ gap: '1rem' }}>
        {patient.entries.map((entry) => (
          <EntryDetails entry={entry} key={entry.id} />
        ))}
      </Stack>
    </div>
  );
};

export default PatientPage;
