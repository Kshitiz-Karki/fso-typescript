import { Diagnosis } from "../../types";

const DiagnoseInfo = ({ code, diagnoses }: { code: string, diagnoses: Diagnosis[] }) => {
  const diagnose = diagnoses.find(x => x.code === code); 
  return (
    <li>
      {code} {diagnose?.name}
    </li>
  );
};

export default DiagnoseInfo;