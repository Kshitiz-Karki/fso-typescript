import { useEffect, useState } from 'react'
import axios from 'axios'
import Diaries from './Components/Diaries'
import { Diary } from "./types";
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [flightDiaries, setFlightDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      getAllDiaries().then(data => {
        setFlightDiaries(data)
    })
  }, [])

  const newDiaryEntry = async(event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const data = await createDiary({ date, weather, visibility, comment })
      setFlightDiaries(flightDiaries.concat(data))
      if(error){
        setError('')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data)
      } else {
        console.error('error occurred - ', error);
      }
    }
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  };
  
  return (
    <>
      <h2>Add new entry</h2>
      <div style={{color: 'red'}}>{error}</div>
      {error && <br />}
      <form onSubmit={newDiaryEntry}>
        <div>
          date: <input
                  value={date}
                  type='date'
                  onChange={(event) => setDate(event.target.value)} 
                />
        </div>
          <fieldset>
            <legend>Please select visibility:</legend>
              <div>
                <label><input type="radio" onChange={() => setVisibility('great')} />Great</label>
                <label><input type="radio" onChange={() => setVisibility('good')} />Good</label>
                <label><input type="radio" onChange={() => setVisibility('ok')} />Ok</label>
                <label><input type="radio" onChange={() => setVisibility('poor')} />Poor</label>
              </div>
          </fieldset>
          <fieldset>
            <legend>Please select weather:</legend>
              <div>
                <label><input type="radio" onChange={() => setWeather('sunny')} />Sunny</label>
                <label><input type="radio" onChange={() => setWeather('rainy')} />Rainy</label>
                <label><input type="radio" onChange={() => setWeather('cloudy')} />Cloudy</label>
                <label><input type="radio" onChange={() => setWeather('stormy')} />Stormy</label>
                <label><input type="radio" onChange={() => setWeather('windy')} />Windy</label>
              </div>
          </fieldset>
        <div>
          comment:  <input
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                    />
        </div>
        <button type='submit'>add</button>
      </form>
      {flightDiaries.map(x =>
        <Diaries key={x.id} diary={x} />)}
    </>
  )
}

export default App
