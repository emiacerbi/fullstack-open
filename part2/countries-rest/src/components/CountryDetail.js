export const CountryDetail = ({ country }) => {
  return (
    <article>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((languages) => (
          <li key={languages}>{languages}</li>
        ))}
      </ul>

      <img src={country.flags.svg} width={175} alt={country.name.common} />
    </article>
  )
}
