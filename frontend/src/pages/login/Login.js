import './Login.css'

import LoginForm from '../../components/Login/LoginForm'
import RegisterForm from '../../components/Login/RegisterForm'
const Login = () => {
    
  return (
    <div className='login'>
        <div className="login_wrapper">
            <LoginForm />
            <RegisterForm />

        </div>

    </div>
  )
}
export default Login