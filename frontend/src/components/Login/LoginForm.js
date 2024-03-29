import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/Inputs/LoginInput/LoginInput";
import { useState } from "react";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const LoginForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginInfos = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const loginValidation = Yup.object().shape({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email"),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/login`,
        {
          email,
          password,
        }
      );
      console.log(data);
      setSuccess("Logged in successfully");
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: data });
        Cookies.set("user", JSON.stringify(data));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            <Form>
              <LoginInput
                name="email"
                type="text"
                placeholder="Email address"
                onChange={handleLoginChange}
              />
              <LoginInput
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleLoginChange}
                bottom
              />
              <button type="submit" className="blue_btn">
                Log in
              </button>
            </Form>
          </Formik>
          <Link to="/reset" className="forgot_password">
            Forgot password ?
          </Link>
          <div className="sign_splitter"></div>
          <DotLoader color="black" loading={loading} size={30} />
          <div className="error_text">{error}</div>
          <div className="success_text">{success}</div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            create account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a page </b>
          for a celebrity,brand or business
        </Link>
      </div>
    </div>
  );
};
export default LoginForm;
