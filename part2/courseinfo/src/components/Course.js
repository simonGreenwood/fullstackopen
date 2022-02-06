
const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}
  
const Total = ({ parts }) => {
  return(
    <div>    
      <b> total of {parts.reduce((sum,part) => sum+part.exercises,0)} exercises</b>
    </div>
  )
}
  
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises} 
    </p>  
  )
}
  
const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part part={part} key={part.id}/>)}
    </div>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}
export default Course
