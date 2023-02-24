import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientSercvice from '../../services/patients';
import { Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Box, CircularProgress } from '@mui/material';

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

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2>{patient?.name}</h2>
        <div>{icon}</div>
      </Box>

      <p>ssn: {patient?.ssn}</p>
      <p>ocupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientPage;
