import { CoursePart } from "../types";

const Part = ( { coursePart }: { coursePart: CoursePart} ) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const courseHeading = () => <><b>{coursePart.name} {coursePart.exerciseCount}</b><br /></>
  
  const part = () => {
    switch (coursePart.kind) {
      case "basic":
        return <>{courseHeading()}<em>{coursePart.description}</em><br /><br /></>
      case "group":
        return <>{courseHeading()}project exercises {coursePart.groupProjectCount}<br /><br /></>
      case "background":
        return (
          <>{courseHeading()}
            <em>{coursePart.description}</em><br />
            {`submit to ${coursePart.backgroundMaterial}`}<br /><br />
          </>
        )
      case "special":
        return (
          <>
            {courseHeading()}
            <em>{coursePart.description}</em><br />
            required skills: {coursePart.requirements.join(', ')}
          </>
        )
      default:
        return assertNever(coursePart)
    }
  }

  return (
    <>
        {part()}
    </>
  )
}

export default Part