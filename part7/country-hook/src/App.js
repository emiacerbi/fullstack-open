import useCountry from './hooks/useCountry'

function App() {
  const { inputValue, searchedCountry, handleChange, handleSearch } =
    useCountry()

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input onChange={handleChange} value={inputValue} />
        <button>find</button>
      </form>

      {searchedCountry === 'not found' ? (
        <p>not found...</p>
      ) : searchedCountry ? (
        <div>
          <h3>{searchedCountry.name.common}</h3>
          <div>population {searchedCountry.population}</div>
          <div>capital {searchedCountry.capital}</div>
          <img
            src={searchedCountry.flags.png}
            height="100"
            alt={`flag of ${searchedCountry.name.common}`}
          />
        </div>
      ) : (
        <p>No countries yet...</p>
      )}
    </div>
  )
}

export default App
