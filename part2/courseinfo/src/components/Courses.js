const Courses=({courses})=>{
    let out=[];
  
    const getTotal=(course)=>{
      let sum=0;
      course.parts.forEach((part)=>sum+=part.exercises)
      return sum;
    }
  
    courses.forEach((course,j) => {
      let out1=[];
      course.parts.forEach((element,i) => {
        out1[i]=<Parts name={element.name} exercises={element.exercises}  key={i}/>
      })
      out[j]=out1;
    });
    
    return (
      <>
        <Header text="Web development curriculun" prio={1}/>
        <Header text={courses[0].name} num={2} />
        {out[0]}
        <Header text={"total of "+getTotal(courses[0])+"exercises"} num={2} /> 
        <Header text={courses[1].name} num={2} />
        {out[1]}
        <Header text={"total of "+getTotal(courses[1])+"exercises"} num={2} />  
      </>
    )
}
  
  
  const Header =({text,prio})=>{
    if(prio==1)
    {
      return (<h1> {text} </h1>)
    }
    else
    {
      return (<h2> {text} </h2>)
    }
  }
  const Parts=({name,exercises})=>{return (<p> {name} {exercises} </p>)}

  
export default Courses;