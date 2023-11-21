import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Patient, Diagnosis, EntryWithoutId } from "../../types";
import PatientEntry from "./PatientEntry";
import Togglable, { ToggleVisibilityRef } from "./Togglable";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Alert from '@mui/material/Alert';
import axios from "axios";
import patientService from '../../services/patients';

interface Props {
  patient: Patient | null;
  diagnoses: Diagnosis[];
  allDiagnosesCodes: string[];
}

const PatientInfo = ({ patient, diagnoses, allDiagnosesCodes }: Props) => {
  const navigate = useNavigate();
  const addEntryFormRef = useRef<ToggleVisibilityRef>(null);
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=> {
    setPatientData(patient);
  }, [patient]);
  
  if (!patientData) return null;

  const gender = () => {
    if(patientData.gender === 'male'){
      return <MaleIcon />;
    }
    if(patientData.gender === 'female'){
      return <FemaleIcon />;
    }
    return <TransgenderIcon />;
  };

  const submitNewEntry = async (values: EntryWithoutId, patientId: string ) => {
    try {
      const entry = await patientService.createNewEntry(values, patientId);
      patient?.entries.push(entry);
      setPatientData(patient);
      navigate(`/patients/${patientId}`);
      if(addEntryFormRef.current){
        addEntryFormRef.current.toggleVisibility();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(''), 5000);
        } else {
          setErrorMessage("Unrecognized axios error");
        }
      } else {
        console.log("Unknown error", e);
        setErrorMessage("Unknown error");
      }
    }
    
  };
  
  return (
    <>
      <h2>{patientData.name} <span>{gender()}</span></h2>
      ssn: {patientData.ssn}<br />
      occupation: {patientData.occupation}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <div style={{paddingTop: 15}}>
        <Togglable 
          buttonLabel='New entry'
          ref={addEntryFormRef}
          onSubmit={submitNewEntry}
          patientId={patientData.id}
          errorMessage={errorMessage}
          allDiagnosesCodes={allDiagnosesCodes}
        />
      </div>
      {patientData.entries.length>0 && <h3>entries</h3>}
      {patientData.entries.map(x => <PatientEntry key={x.id} entry={x} diagnoses={diagnoses} />)}
    </>
  );
};

export default PatientInfo;