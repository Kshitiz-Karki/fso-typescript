import { Diary } from "../types"

const Diaries = ({ diary }: { diary: Diary}) => {
  return (
    <>
      <h2>Diary entries</h2>
      <h3>{diary.date}</h3>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
    </>
  ) 
}

export default Diaries