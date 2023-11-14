import Part from "./Part"
import { CoursePart } from "../types"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  let count = 0
  return (
    <>
      {courseParts.map(x => <Part key={count++} coursePart={x} />)}
    </>
  )
}

export default Content