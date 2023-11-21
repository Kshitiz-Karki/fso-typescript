import DiagnoseInfo from "./DiagnoseInfo";
import { Entry, Diagnosis } from "../../types";
import Card from '@mui/material/Card';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const Hospital = ({ entry, diagnoses }: Props) => {
  return (
    <div style={{ paddingBottom: 10 }}>
      <Card variant="outlined" sx={{ border: 1, lineHeight: 1.5, paddingLeft: 1 }}>
        <div>
          {entry.date} {<WorkIcon />}
        </div>

        <i>{entry.description}</i><br />
        {entry.diagnosisCodes && <ul>
          {entry.diagnosisCodes?.map(x => <DiagnoseInfo key={x} code={x} name={diagnoses.find(y => y.code === x)?.name} />)}
        </ul>}
        diagnose by {entry.specialist}
      </Card>
    </div>
  );
};

export default Hospital;