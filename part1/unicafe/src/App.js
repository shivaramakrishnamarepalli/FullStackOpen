import {useState} from "react"

const App = () =>{
  const[good,setGood] = useState(0);
  const[neutral,setNutral]=useState(0);
  const[bad,setBad]=useState(0);

  const getTotal = () => good+neutral+bad;
  const getAverage =()=>(good-bad)/getTotal();
  const getPositivePercentage =()=>(good*100)/getTotal();

  return (
    <>
      <Header text="Give feedback"/>

      <Button text="good" handleClick={()=>{setGood(good+1)}}/>
      <Button text="neutral" handleClick={()=>{setNutral(neutral+1)}}/>
      <Button text="bad" handleClick={()=>{setBad(bad+1)}}/>
      
      <Header text="statistics"/>

      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        total={getTotal()}
        average={getAverage()}
        positive={getPositivePercentage()}
      />
    </>
  )
}


const Statistics=({good,neutral,bad,total,average,positive})=>{
  if((good === 0)&& (neutral === 0)&& (bad === 0))
  {
    return (<h3>No feedback given.</h3>)
  }
  else
  {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>
                <StatisticLine text="Good " />
              </td>
              <td>
                <StatisticLine value={good} />
              </td>
            </tr>
            <tr>
              <td>
               <StatisticLine text="Neutral " />
              </td>
              <td>
                <StatisticLine value={neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="Bad " />
              </td>
              <td>
                <StatisticLine value={bad} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="All " />
              </td>
              <td>
                <StatisticLine value={total} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="Average " />
              </td>
              <td>
                <StatisticLine value={average} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="Positive " />
              </td>
              <td>
                <StatisticLine value={positive} symbol="%"/>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
}


const Header = ({text})=>{return(<h1>{text}</h1>)}
const Button = ({text,handleClick}) =>{return(<><button onClick={handleClick}>{text}</button></>)}
const StatisticLine = ({text,value,symbol}) =>{return(<div>{text}{value}{symbol}</div>)}

export default App;