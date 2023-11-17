import { HealthCheckEntry, Diagnosis } from "../../types";
import Card from '@mui/material/Card';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { green, yellow, orange, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiagnoseInfo from "./DiagnoseInfo";

const HealthCheck = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: Diagnosis[]}) => {
  // const color = pink[500];
  console.log('entry.healthCheckRating - ', entry.healthCheckRating);
  let count = 0;
  
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
          {entry.diagnosisCodes?.map(x => <DiagnoseInfo key={count++} code={x} diagnoses={diagnoses} />)}
        </ul>}
        diagnose by {entry.specialist}
      </Card>
    </div>
  );
};

export default HealthCheck;