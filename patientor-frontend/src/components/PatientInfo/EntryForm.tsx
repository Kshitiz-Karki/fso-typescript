import { EntryWithoutId, EntryType, BaseEntryWithoutId } from '../../types';
import { useState, useEffect, SyntheticEvent } from 'react';
import { TextField, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

interface Props {
  visible: boolean;
  toggleVisibility: () => void;
  onSubmit: (values: EntryWithoutId, patientId: string ) => void;
  patientId: string;
  allDiagnosesCodes: string[];
}

const EntryForm = ({ visible, toggleVisibility, onSubmit, patientId, allDiagnosesCodes }: Props) => {
  const [type, setType] = useState<EntryType | ''>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  
  const resetFormValues = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes([]);
    setEmployerName('');
    setDischargeDate('');
    setDischargeCriteria('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
  };

  useEffect(() => {
    setType('');
    resetFormValues();
  }, [visible]);

  useEffect(() => {
    resetFormValues();
  }, [type]);

  const handleTypeChange = (event: SelectChangeEvent) => setType(event.target.value as EntryType);
  const handleDescriptionChange = (event: { target: { value: string; }; }) => setDescription(event.target.value);
  const handleRatingChange = (event: { target: { value: string; }; }) => setHealthCheckRating(event.target.value);
  const handleDateChange = (event: { target: { value: string; }; }) => setDate(event.target.value);
  const handleSpecialistChange = (event: { target: { value: string; }; }) => setSpecialist(event.target.value);
  const handleEmployerNameChange = (event: { target: { value: string; }; }) => setEmployerName(event.target.value);
  const handleDischargeDateChange = (event: { target: { value: string; }; }) => setDischargeDate(event.target.value);
  const handleDischargeCriteriaChange = (event: { target: { value: string; }; }) => setDischargeCriteria(event.target.value);
  const handleSickLeaveStartDateChange = (event: { target: { value: string; }; }) => setSickLeaveStartDate(event.target.value);
  const handleSickLeaveEndDateChange = (event: { target: { value: string; }; }) => setSickLeaveEndDate(event.target.value);
  const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry: BaseEntryWithoutId = {
      description,
      date,
      specialist
    };
    if(diagnosisCodes.length > 0){
      baseEntry.diagnosisCodes = diagnosisCodes;
    }
    if(type === 'HealthCheck'){
      onSubmit({
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: Number(healthCheckRating)
      }, patientId);
    }
    else if(type === 'Hospital'){
      onSubmit({
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      }, patientId);
    } else {
      const occupationalHealthcareEntry: EntryWithoutId = {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName
      };
      if(sickLeaveStartDate && sickLeaveEndDate){
        occupationalHealthcareEntry.sickLeave = { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate };
      }
      onSubmit(occupationalHealthcareEntry, patientId);
    }
    resetFormValues();
  };
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <h3>{`New ${type} Entry`}</h3>
      <form onSubmit={addEntry}>
        <FormControl fullWidth required>
        <InputLabel id="entry-type">Entry Type</InputLabel>
        <Select
          labelId="entry-type"
          value={type}
          label="Entry Type"
          onChange={handleTypeChange}
          required
        >
          <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
          <MenuItem value={"Hospital"}>Hospital</MenuItem>
          <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
        </Select>
        </FormControl>
        <TextField 
          label="Description"
          fullWidth 
          variant="standard"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <InputLabel>Date *</InputLabel>
        <TextField 
          // label="Date"
          fullWidth 
          variant="standard"
          value={date}
          onChange={handleDateChange}
          required
          type='date'
        />
        <TextField
          label="Specialist"
          fullWidth
          variant="standard"
          value={specialist}
          onChange={handleSpecialistChange}
          required
        />
        <div style={{display: type === "HealthCheck" ? "" : "none", paddingTop: 15}}>
          <FormControl fullWidth required={type === "HealthCheck"}>
            <InputLabel id="health-check-rating">Healthcheck rating</InputLabel>
            <Select
              labelId="health-check-rating"
              value={healthCheckRating}
              label="Healthcheck rating"
              onChange={handleRatingChange}
              required={type === "HealthCheck"}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>LowRisk</MenuItem>
              <MenuItem value={2}>HighRisk</MenuItem>
              <MenuItem value={3}>CriticalRisk</MenuItem>
            </Select>
        </FormControl>
        </div>
        <div style={{paddingTop: 15}}>
          <FormControl fullWidth>
          <InputLabel id="diagnosis-codes">Diagnosis codes</InputLabel>
          <Select
            labelId="diagnosis-codes"
            label="Diagnosis codes"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput label="Diagnosis codes" />}
            MenuProps={MenuProps}
          >
            {allDiagnosesCodes.map((code) => (
              <MenuItem
                key={code}
                value={code}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>
        <div style={{display: type === "OccupationalHealthcare" ? "" : "none"}}>
          <TextField 
            label="Employer Name"
            fullWidth 
            variant="standard"
            value={employerName}
            onChange={handleEmployerNameChange}
            required={type === "OccupationalHealthcare"}
          />
        </div>
        <div style={{display: type === "OccupationalHealthcare" ? "" : "none", paddingTop: 10}}>
          <InputLabel>Sick Leave</InputLabel>
            <div style={{marginLeft: '2%', width: '98%'}}>
              <InputLabel>Start Date</InputLabel>
                <TextField 
                  fullWidth
                  variant="standard"
                  value={sickLeaveStartDate}
                  onChange={handleSickLeaveStartDateChange}
                  size='small'
                  required={type === "OccupationalHealthcare" && sickLeaveEndDate ? true : false}
                  type='date'
                />
            </div>
            <div style={{marginLeft: '2%', width: '98%'}}>
              <InputLabel>End Date</InputLabel>
                <TextField 
                  fullWidth
                  variant="standard"
                  value={sickLeaveEndDate}
                  onChange={handleSickLeaveEndDateChange}
                  size='small'
                  required={type === "OccupationalHealthcare" && sickLeaveStartDate ? true : false}
                  type='date'
                />
            </div>
        </div>
        <div style={{display: type === "Hospital" ? "" : "none"}}>
          <InputLabel>Discharge Date *</InputLabel>
          <TextField 
            fullWidth
            variant="standard"
            value={dischargeDate}
            onChange={handleDischargeDateChange}
            required={type === "Hospital"}
            type='date'
          />
        </div>
         <div style={{display: type === "Hospital" ? "" : "none"}}>
          <TextField 
            label="Discharge Criteria"
            fullWidth
            variant="standard"
            value={dischargeCriteria}
            onChange={handleDischargeCriteriaChange}
            required={type === "Hospital"}
          />
        </div>
        <div style={{paddingTop: 15}}>
          <Button onClick={toggleVisibility} variant="contained" color="error">Cancel</Button>
          <Button variant="contained" color="inherit" type="submit"  style={{float: "right"}}>
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

export default EntryForm;