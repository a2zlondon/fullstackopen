const Search = ({ newSearch, changeHandler }) => {
    return (
        <div>
            find countries <input value={newSearch} onChange={changeHandler} /> 
        </div>    
    )
}

export default Search