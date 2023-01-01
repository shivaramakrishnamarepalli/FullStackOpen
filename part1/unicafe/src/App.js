import {useState} from "react"

const App = () =>{
  const[good,setGood] = useState(0);
  const[neutral,setNutral]=useState(0);
  const[bad,setBad]=useState(0);

  return (
    <>
      <Header text="Give feedback"/>

      <Button text="good" handleClick={()=>{setGood(good+1)}}/>
      <Button text="neutral" handleClick={()=>{setNutral(neutral+1)}}/>
      <Button text="bad" handleClick={()=>{setBad(bad+1)}}/>
      
      <Header text="statistics"/>

      <Display text="good :" value={good} />
      <Display text="neutral :" value={neutral} />
      <Display text="bad :" value={bad} />
    </>
  )
}


const Header = ({text})=>{return(<><h1>{text}</h1></>)}
const Button = ({text,handleClick}) =>{return(<><button onClick={handleClick}>{text}</button></>)}
const Display = ({text,value}) =>{return(<><div>{text}{value}</div></>)}

export default App;