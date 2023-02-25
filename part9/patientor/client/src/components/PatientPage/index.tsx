import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientSercvice from '../../services/patients';
import { Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Box, CircularProgress, Stack } from '@mui/material';
import EntryDetails from '../EntryDetails';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
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

  console.log(patient);

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
