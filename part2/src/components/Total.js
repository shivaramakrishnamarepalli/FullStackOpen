import React from "react"

const Total = (props) => {
  let total = props.part.reduce((sum,part)=>(sum+part.exercises),0)
  return <h2>Number of exercises {total}</h2>
}

export default Total