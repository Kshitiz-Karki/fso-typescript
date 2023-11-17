import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

import PatientInfo from "./components/PatientInfo";
import diagnoseService from "./services/diagnoses";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);
  

  const match = useMatch('/patients/:id');

  // const patient: Patient | null | undefined = match
  //   ? patients.find(patient => patient.id === match.params.id)
  //   : null;

  useEffect(() => {
    const patientId: string | undefined = match?.params.id;
    if(patientId){
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(patientId);
      setPatient(patient);
    };
    
      void fetchPatient();
    }
  }, [match]);
  
  // console.log('match - ', match);
  console.log('patient - ', patient);
  // console.log('###########################################');
  
  
  return (
    <div className="App">
     
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientInfo patient={patient} diagnoses={diagnoses} />} />
          </Routes>
        </Container>
     
    </div>
  );
};

export default App;
