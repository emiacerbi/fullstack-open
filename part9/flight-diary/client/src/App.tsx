import { Fragment } from 'react';
import useDiaries from './hooks/useDiaries';
import { Visibility, Weather } from './types';

function App() {
  const { handleSubmit, handleInputChange, error, diaries, diaryEntry } =
    useDiaries();

  const errorStyle = {
    color: 'red',
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add new entry</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <div>
          date{' '}
          <input
            type="date"
            name="date"
            onChange={handleInputChange}
            value={diaryEntry.date}
            placeholder="2017-01-01"
          />
        </div>

        <div>
          visibility
          {Object.values(Visibility).map((v) => (
            <Fragment key={v}>
              {v}
              <input
                type="radio"
                name="visibility"
                onChange={handleInputChange}
                value={v}
              />
            </Fragment>
          ))}
        </div>

        <div>
          weather
          {Object.values(Weather).map((v) => (
            <Fragment key={v}>
              {v}
              <input
                type="radio"
                name="weather"
                onChange={handleInputChange}
                value={v}
              />
            </Fragment>
          ))}
        </div>

        <div>
          comment{' '}
          <input
            type="text"
            name="comment"
            onChange={handleInputChange}
            value={diaryEntry.comment}
          />
        </div>

        <button>add</button>
      </form>

      <h2>Diary entries</h2>

      <div>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
