import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

export default function Course(props){
    return (
        <div>
            {
                props.courses.map((course)=>
                    <div key={course.id}>
                        <Header name={course.name}/>
                        <Content course={course}/>
                        <Total part={course.parts} />
                    </div>
                )
            }
        </div>
    ) 
}