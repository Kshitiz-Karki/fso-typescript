import { Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientInfo = ({ patient }: { patient: Patient | null}) => {
  if (!patient) return null;
  const gender = () => {
    if(patient.gender === 'male'){
      return <MaleIcon />;
    }
    if(patient.gender === 'female'){
      return <FemaleIcon />;
    }
    return <TransgenderIcon />;
  };

  return (
    <>
      <h2>{patient.name} <span>{gender()}</span></h2>
      ssn: {patient.ssn}<br />
      occupation: {patient.occupation}
    </>
  );
};

export default PatientInfo;