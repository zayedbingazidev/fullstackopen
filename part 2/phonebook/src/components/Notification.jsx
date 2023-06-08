const Notification = (props) => {
      if (props.errorMessage.type === null) {
            return null
      }
      return <div className={props.errorMessage.type}>
      {props.errorMessage.message}
    </div>
}


export default Notification

// const Notification = ({ type, message }) => {
//       if (message === null) {
//         return null
//       }
    
//       return (
//         <div className={type}>
//           {message}
//         </div>
//       )
// }
