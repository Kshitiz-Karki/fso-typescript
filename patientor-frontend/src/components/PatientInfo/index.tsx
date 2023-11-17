import { Patient, Diagnosis } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import PatientEntry from "./PatientEntry";

const PatientInfo = ({ patient, diagnoses }: { patient: Patient | null, diagnoses: Diagnosis[]}) => {
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
      {patient.entries.length && <h3>entries</h3>}
      {patient.entries.map(x => <PatientEntry key={x.id} entry={x} diagnoses={diagnoses} />)}
    </>
  );
};

export default PatientInfo;