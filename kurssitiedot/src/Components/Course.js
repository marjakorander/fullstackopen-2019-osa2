import React from "react";

const Course = ({courses}) => {
    return (
      courses.map(course => {
        return(
        <div key={course.id}>
              <Header course={course}/>
              <Content parts={course.parts}/>
              <Total parts={course.parts}/>
        </div>    
      )})
    )
  }
  
  const Header = ({course}) => {
    return (
      <div key={"Course"+course.id}>
        <h2>{course.name}</h2>
      </div>
    );
  };

  const Content = ({parts}) => {
    return (
      parts.map(parts => {
        return(
          <div key={"Parts"+parts.id}> 
            <p>{parts.name} {parts.exercises} </p>
          </div>)}
    ))
  }
  
  const Total = ({parts}) => {
    return (
      <div>
        <p key={"Total"+parts.id}>
          yhteensä {parts.reduce((total, parts) => total + parts.exercises, 0)} tehtävää
        </p>
      </div>
    )
  };

  export default Course;