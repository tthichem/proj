import './Login.css'
import { RxCross2 } from "react-icons/rx";

const Login = ({setShowLogin}) => {
  return (
    <div className='login'>
        <form className="login-container">
            <div className="login-title">
                <h2>Login As Administrator</h2>
                <RxCross2 onClick={()=>setShowLogin(false)} className='cross'/>
            </div>
            <div className="login-input">
                <input type="text" placeholder='Username' required/>
                <input type="text" placeholder='Password' required/>
            </div>
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login