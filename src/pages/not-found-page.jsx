import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <>
        <div style={{
            width:"100%",
            height:"70vh",
            fontSize: "45px",
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center"
        }}>Not Found Page 
        <button className="btn btn-secondary">
            <Link to="/">Home Page</Link>
        </button>
        </div>

        
    </>

    
  )
}

export default NotFoundPage