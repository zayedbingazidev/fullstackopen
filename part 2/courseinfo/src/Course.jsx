const Header = ({name}) => {
  return (
    <h1>
      {name}
    </h1>
  )
}

const Part = ({part, exercises}) => {
  return (
    <p>
        {part} {exercises}
    </p>
  )
}
const Content = ({course}) => {
  return (
    <div>
      {
            course.parts.map((part, i) => {
                  return <Part key={i} part={part.name} exercises={part.exercises}/>
            })
      }
    </div>
  )
}
const Total = ({parts}) => {
  const initialValue = 0
  const totalCount = parts.reduce((accumulator, currentValue) => {
      console.log("accumulator", accumulator)
      console.log("currentValue", currentValue)
     return accumulator + currentValue.exercises;
  }, initialValue)
  return (
    <p>Total of {totalCount} exercises</p>
    )
}

const Course = ({course}) => {
return (
    <div>
      {course.map(c => {
            return (
                  <>
                  <Header name={c.name} />
                  <Content course={c}/>
                  <Total parts={c.parts}/>
            </>)
      })}
    </div>
  )
}

export default Course;