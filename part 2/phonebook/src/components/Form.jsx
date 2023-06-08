const Form = ({componentState, handleChange, handleSubmit}) => {

      return <form onSubmit={handleSubmit}>
                  <div>
                        Name: <input value={componentState['name']} onChange={handleChange['name']} />
                  </div>
                  <div>
                        Number: <input value={componentState['number']} onChange={handleChange['number']} />
                  </div>
                  <div>
                        <button type="submit">add</button>
                  </div>
            </form>
}

export default Form