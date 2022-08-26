import './Login.css'
import {Formik,Form, Field} from 'formik'
import {Link} from 'react-router-dom'
import LoginInput from '../../components/Inputs/LoginInput/LoginInput'
import { useState } from 'react'
import *as Yup from 'yup'
const Login = () => {
    const loginInfos = {
        email: '',
        password: '',
    }
    const [login, setLogin] = useState(loginInfos)
    const {email, password} = login
    const handleLoginChange = (e)=>{
        const {name,value} = e.target
        setLogin({...login,[name]:value})

    }

    const loginValidation = Yup.object().shape({
        email: Yup.string().required('Email address is required').email('Must be a valid email'),
        password: Yup.string().required('Password is required')
    })
  return (
    <div className='login'>
        <div className="login_wrapper">
            <div className="login_wrap">
                <div className="login_1">
                    <img src="../../icons/facebook.svg" alt="" />
                    <span>Facebook helps you connect and share with the people in your life</span>
                </div>
                <div className="login_2">
                    <div className="login_2_wrap">
                    <Formik
                    enableReinitialize
                    initialValues={{
                        email,
                        password
                    }}
                    validationSchema={loginValidation}
                    >
                            <Form>
                            <LoginInput name='email' type='text' placeholder="Email address" onChange={handleLoginChange}/>
                            <LoginInput name='password' type='password' placeholder="Password" onChange={handleLoginChange} bottom/>
                            <button type='submit' className='blue_btn'>Log in</button>
                            </Form>
                        </Formik>
                        <Link to='/forgot' className='forgot_password'>Forgot password ?</Link>
                        <div className="sign_splitter">

                        </div>
                        <button className='blue_btn open_signup'>create account</button>
                    </div>
                    <Link to='/' className='sign_extra'>
                        <b>Create a page</b>
                        for a celebrity,brand or business
                    </Link>
                </div>
            </div>
            <div className="register">

            </div>
        </div>

    </div>
  )
}
export default Login