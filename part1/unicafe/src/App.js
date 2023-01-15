import { useState } from 'react'

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const positive = (good / all) * 100 + ' %'

  return (
    <>
      <h1>statistics</h1>

      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={avg} />
            <StatisticsLine text="positive" value={positive} />
          </tbody>
        </table>
      )}
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleSetGood = () => {
    setGood(good + 1)
  }

  const handleSetNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleSetBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleSetGood}>good</Button>
      <Button onClick={handleSetNeutral}>neutral</Button>
      <Button onClick={handleSetBad}>bad</Button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
