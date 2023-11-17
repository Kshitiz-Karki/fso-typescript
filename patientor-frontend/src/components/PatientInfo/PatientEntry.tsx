import OccupationalHealthCare from "./OccupationalHealthCare";
import HospitalEntry from "./Hospital";
import HealthCheck from "./HealthCheck";
import { Entry, Diagnosis } from "../../types";

const PatientEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[]}) => {
    

    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    switch (entry.type) {
      case "OccupationalHealthcare":
        return <OccupationalHealthCare entry={entry} diagnoses={diagnoses} />;
      case "Hospital":
        return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }

    // return (
    // <>
    //   {entry.date} {entry.description}
    //   <ul>
    //     {entry.diagnosisCodes?.map(x => <DiagnoseInfo key={count++} code={x} diagnoses={diagnoses} />)}
    //   </ul>
    // </>
    // );
};

export default PatientEntry;