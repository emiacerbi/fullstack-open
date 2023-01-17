export const Filter = ({ handleFilterChange, filterInput }) => {
  return (
    <div>
      filter shown with{' '}
      <input onChange={handleFilterChange} value={filterInput} />
    </div>
  )
}
