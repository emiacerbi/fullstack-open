import { Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import HealingIcon from '@mui/icons-material/Healing';

import {
  Entry,
  HealthCheckEntry,
  HospitalEntry as HospitalEntryType,
  OccupationalHealthcareEntry,
} from '../../types';

const getIcon = (type: string) => {
  switch (type) {
    case 'OccupationalHealthcare':
      return <WorkIcon />;
    case 'HealthCheck':
      return <HealingIcon />;
    case 'Hospital':
      return <LocalHospitalIcon />;
    default:
      return null;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type Props = {
  entry: Entry;
};

const entryStyle = {
  border: '1px solid black',
  padding: '.5rem 1rem',
  borderRadius: '.5rem',
};

const HospitalEntry = ({ entry }: { entry: HospitalEntryType }) => {
  const icon = getIcon(entry.type);
  return (
    <Box sx={entryStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        {entry.date} {icon}
      </Box>
      <p>{entry.discharge.criteria}</p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </Box>
  );
};
const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const icon = getIcon(entry.type);

  const colorObj = {
    Healthy: 'blue',
    LowRisk: 'green',
    HighRisk: 'yellow',
    CriticalRisk: 'red',
  };

  const iconColor = colorObj[entry.healthCheckRating];

  return (
    <Box sx={entryStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        {entry.date} {icon}
      </Box>
      <p>{entry.description}</p>
      <FavoriteIcon sx={{ color: iconColor }} />
      <p>diagnose by {entry.specialist}</p>
    </Box>
  );
};
const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const icon = getIcon(entry.type);

  return (
    <Box sx={entryStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        {entry.date} {icon}
      </Box>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </Box>
  );
};

const EntryDetails = ({ entry }: Props) => {
  if (!entry) return null;
  switch (entry.type) {
    case 'Hospital': {
      return <HospitalEntry entry={entry} />;
    }
    case 'HealthCheck': {
      return <HealthCheck entry={entry} />;
    }
    case 'OccupationalHealthcare': {
      return <OccupationalHealthcare entry={entry} />;
    }
    default:
      assertNever(entry);
  }

  return null;
};

export default EntryDetails;
