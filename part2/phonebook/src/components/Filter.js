/* eslint-disable react/prop-types */
const Filter = ({ newFilter, changeHandler }) => {
  return (
    <div>
      filter shown with: <input value={newFilter} onChange={changeHandler} />
    </div>
  )
}

export default Filter