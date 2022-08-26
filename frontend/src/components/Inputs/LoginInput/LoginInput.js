import { ErrorMessage, useField } from 'formik'
import './style.css'
const LoginInput = ({placeholder,bottom,...props}) => {
  const [field,meta] = useField(props) 
  console.log(meta)
  return (
    <div className='input_wrap'>
      {meta.touched && meta.error && !bottom &&
      <div className='input_error'>
      {
        meta.touched && meta.error && <ErrorMessage name={field.name}/>
      }
    </div>}
        <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        type={field.type} name={field.name} placeholder={placeholder} {...field} {...props}/>
        {meta.touched && meta.error && <i className='error_icon'></i>}

        {meta.touched && meta.error && bottom &&
      <div className='input_error'>
      {
        meta.touched && meta.error && <ErrorMessage name={field.name}/>
      }
    </div>}
    </div>
  )
}

export default LoginInput