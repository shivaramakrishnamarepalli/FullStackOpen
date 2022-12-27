const Header = (props) => {

  <h1>{props.course}</h1>;

}


const Part = (props) => (

  <p>
    {props.name} {props.exercises}
  </p>

);


const Content = (props) => {

  return (
    <>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  );

};


const Total = (props) => {

  const sum =0;
  props.parts.forEach(element => {
    sum += element.exercises
  });

  return (
    <p>
      Number of exercises {" "} {sum}
    </p>
  );

};


const App = () => {

  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );

};

export default App;