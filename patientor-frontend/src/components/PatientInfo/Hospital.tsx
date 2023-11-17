import DiagnoseInfo from "./DiagnoseInfo";
import { Entry, Diagnosis } from "../../types";
import Card from '@mui/material/Card';
import WorkIcon from '@mui/icons-material/Work';

const Hospital = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[]}) => {
  let count = 0;

  return (
    <div style={{ paddingBottom: 10 }}>
      <Card variant="outlined" sx={{ border: 1, lineHeight: 1.5, paddingLeft: 1 }}>
        <div>
          {entry.date} {<WorkIcon />}
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

export default Hospital;