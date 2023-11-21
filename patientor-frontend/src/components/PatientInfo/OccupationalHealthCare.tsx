import { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import DiagnoseInfo from "./DiagnoseInfo";
import WorkIcon from '@mui/icons-material/Work';
import Card from '@mui/material/Card';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthCare = ({ entry, diagnoses }: Props) => {
  let count = 0;
  return (
    <div style={{ paddingBottom: 10 }}>
      <Card variant="outlined" sx={{ border: 1, lineHeight: 1.5, paddingLeft: 1 }}>
        <div>
          {entry.date} {<WorkIcon />} <i>{entry.employerName}</i>
        </div>

        <i>{entry.description}</i><br />
        {entry.diagnosisCodes && <ul>
          {entry.diagnosisCodes?.map(x => <DiagnoseInfo key={count++} code={x} name={diagnoses.find(y => y.code === x)?.name} />)}
        </ul>}
        diagnose by {entry.specialist}
      </Card>
    </div>
  );
};

export default OccupationalHealthCare;