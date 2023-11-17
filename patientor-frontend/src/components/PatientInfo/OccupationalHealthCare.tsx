import { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import WorkIcon from '@mui/icons-material/Work';
import Card from '@mui/material/Card';
import DiagnoseInfo from "./DiagnoseInfo";

const OccupationalHealthCare = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}) => {
  let count = 0;
  return (
    <div style={{ paddingBottom: 10 }}>
      <Card variant="outlined" sx={{ border: 1, lineHeight: 1.5, paddingLeft: 1 }}>
        <div>
          {entry.date} {<WorkIcon />} <i>{entry.employerName}</i>
        </div>

        <i>{entry.description}</i><br />
        {entry.diagnosisCodes && <ul>
          {entry.diagnosisCodes?.map(x => <DiagnoseInfo key={count++} code={x} diagnoses={diagnoses} />)}
        </ul>}
        diagnose by {entry.specialist}
      </Card>
    </div>
  );
};

export default OccupationalHealthCare;