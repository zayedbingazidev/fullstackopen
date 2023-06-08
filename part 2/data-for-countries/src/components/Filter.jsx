const Filter =({filter, handleFilterOnChange}) => {

      return <div>
            Find Countries <input value={filter} onChange={handleFilterOnChange}/>
      </div>
}
export default Filter