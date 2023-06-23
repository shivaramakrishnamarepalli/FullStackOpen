import "../App.css"
const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    let cname = "error"
    if(message.startsWith("Added"))
      cname="addedPerson"
    else if(message.startsWith("Deleted"))
      cname="deletedPerson"
      
    return (
      <div className={cname}>
        {message}
      </div>
    )
  }

  export default Notification