import { Form, Formik } from "formik"
import { useState } from "react"
import RegisterInput from "../Inputs/RegisterInput"
import *as Yup from 'yup'

const RegisterForm = () => {
    const userInfos = {
        first_name : '',
        last_name : '',
        email : '',
        password : '',
        bYear : new Date().getFullYear(),
        bMonth : new Date().getMonth() + 1,
        bDay : new Date().getDate(),
        gender:''
    }
    const [user, setUser] = useState(userInfos)
    const {first_name, last_name, email, password, bYear, bMonth, bDay, gender} = user
    const handleRegisterChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const registerValidation = Yup.object().shape({
        first_name: Yup.string().required(`What's your name?`).min(3,'First Name must be at least 2 characters long')
        .max(10,'First Name must be at least 10 characters long')
        .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),

        last_name: Yup.string().required('Surname is required').min(3,'Surname must be at least 2 characters long')
        .max(10,'Surname must be at least 10 characters long')
        .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
        email:Yup.string().required(`You will need this when you login or you ever need to reset your password`)
        .email('Enter a valid email address'),
        password:Yup.string().required('Enter a combination of six letters numbers and special characters such as (* and #)').
        min(6,'Password must be atleast 6 characters long')
        .max(16,'Password cannot be greater then 16 characters')
    })
    const tempYear = new Date().getFullYear()
    const years  = Array.from(new Array(100),(val,index) => tempYear - index)
    const months  = Array.from(new Array(12),(val,index) => 1 + index)
    const getDays = () =>{
        return new Date(bYear,bMonth,0).getDate()
    }
    const dates = Array.from(new Array(getDays()),(val,index) => 1 + index)
  return (

    <div className="blur">
        <div className="register">
            <div className="register_header">
                <i className="exit_icon"></i>
                <span>Sign up </span>
                <span>It's quick and easy</span>
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    first_name,
                    last_name ,
                    email ,
                    password ,
                    bYear ,
                    bMonth ,
                    bDay,
                    gender
                }}
                validationSchema={registerValidation}

            >
                <Form className="register_form">
                    <div className="reg_line">
                        <RegisterInput type='text' placeholder='First Name' name='first_name' onChange={handleRegisterChange}/>
                        <RegisterInput type='text' placeholder='SurName' name='last_name' onChange={handleRegisterChange}/>
                    </div>
                    <div className="reg_line">
                        <RegisterInput type='email' placeholder='Email Address' name='email' onChange={handleRegisterChange}/>
                    </div>
                    <div className="reg_line">
                        <RegisterInput type='password' placeholder='Password' name='password' onChange={handleRegisterChange}/>
                    </div>
                    <div className="reg_col">
                        <div className="reg_line_header">
                            Date of birth <i className='info_icon'></i>
                        </div>
                        <div className="reg_grid">
                            <select name="bDay" id="" value={bDay} onChange={handleRegisterChange}>
                                {dates.map((date, i) =>{
                                    return <option key={i} value={date}>{date}</option>
                                })}
                            </select>
                            <select name="bMonth" id="" value={bMonth} onChange={handleRegisterChange}>
                                {months.map((month, i) =>{
                                    return <option key={i} value={month}>{month}</option>
                                })}
                            </select>
                            <select name="bYear" id="" value={bYear} onChange={handleRegisterChange}>
                                {years.map((year, i) =>{
                                    return <option key={i} value={year}>{year}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="reg_col">
                        <div className="reg_line_header">
                            Gender <i className='info_icon'></i>
                        </div>
                        <div className="reg_grid">
                            <label htmlFor="male">
                                Male
                                <input type="radio" name="gender" id="male" value="male" onChange={handleRegisterChange}/>
                            </label>
                            <label htmlFor="female">
                                Female
                                <input type="radio" name="gender" id="female" value="female" onChange={handleRegisterChange}/>
                            </label>
                            <label htmlFor="custom">
                                Custom
                                <input type="radio" name="gender" id="custom" value="custom" onChange={handleRegisterChange}/>
                            </label>
                        </div>
                    </div>

                    <div className="reg_infos">
                        By clicking Sign up,you agree to our(" ")
                        <span>Terms ,data policy &nbsp;</span>
                        and <span>Cookie policy.</span> You may 
                        receive SMS notification from us and can opt out any time
                    </div>
                    <div className="reg_btn_wrapper">
                        <button className="blue_btn open_signup">
                            Sign Up
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>
  )
}
export default RegisterForm