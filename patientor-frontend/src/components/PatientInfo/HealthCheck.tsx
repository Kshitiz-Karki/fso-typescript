import { HealthCheckEntry, Diagnosis } from "../../types";
import DiagnoseInfo from "./DiagnoseInfo";
import Card from '@mui/material/Card';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { green, yellow, orange, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheck = ({ entry, diagnoses }: Props) => {
  let color: string;
  switch (entry.healthCheckRating) {
    case 0:
      color = green[700];
      break;
    case 1:
      color = yellow[500];
      break;
    case 2:
      color = orange[800];
      break;
    case 3:
      color = red[800];
      break;
    default:
      color = "primary";
      break;
  }

  return (
    <div style={{ paddingBottom: 10 }}>
      <Card variant="outlined" sx={{ border: 1, lineHeight: 1.5, paddingLeft: 1 }}>
        <div>
          {entry.date} {<MedicalServicesIcon />}
        </div>
        <i>{entry.description}</i><br />
        <div>
          <FavoriteIcon sx={{ color }} />
        </div>
        {entry.diagnosisCodes && <ul>
          {entry.diagnosisCodes?.map(x => <DiagnoseInfo key={x} code={x} name={diagnoses.find(y => y.code === x)?.name} />)}
        </ul>}
        diagnose by {entry.specialist}
      </Card>
    </div>
  );
};

export default HealthCheck;