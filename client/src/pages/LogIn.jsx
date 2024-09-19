import React, { useContext, useState } from 'react'
import logo from "../images/redentry-Logo.png"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function LogIn() {
  const { setIsAuth, setUser, user ,isAuth} = useContext(UserContext);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [values, setValues] = useState({
    user_password: "",
    user_email: "",
    user_name: ""
  });
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit() {
    try {
      if (!values.user_email || !values.user_password || (!isLoginPage && !values.user_name)) {
        setLoginError('Please fill in all fields.');
        return;
      }
      const url = isLoginPage
        ? 'http://localhost:3000/api/users/login'
        : 'http://localhost:3000/api/users/signup';

      const payload = isLoginPage
        ? { user_email: values.user_email, user_password: values.user_password }
        : { ...values };

      const { data } = await axios.post(url, payload, { withCredentials: true });
      if (data.success === false) {
        setLoginError(data.message);
        return;
      }
      console.log(data)

      await setIsAuth(true)
      await setUser(data)
      console.log(isAuth)

      navigate('/home');
    } catch (error) {
      console.log(error.response.data[0]?.message || "An error occurred");
      setLoginError(error.response.data[0]?.message || "An error occurred");
    }
  }

  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')"
  };


  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-1/2" style={backgroundStyle}></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-20 dark:bg-gray-900" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            {!isLoginPage ? "Sign up" : "Welcome back!"}
          </p>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
            <input
              id="LoggingEmailAddress"
              name="user_email"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              onChange={(e) => handleChange(e)}
              value={values.user_email}
            />
          </div>

          {!isLoginPage && (<div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Name</label>
            <input
              id="LoggingName"
              name="user_name"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="name"
              onChange={(e) => handleChange(e)}
              value={values.user_name}
            />
          </div>)}

          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
            </div>

            <input
              id="loggingPassword"
              name="user_password"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              onChange={(e) => handleChange(e)}
              value={values.user_password}
            />

          </div>

          <div className="flex justify-center">
            {loginError && <p className="block mb-2 mt-5 text-sm font-medium text-red-600 dark:text-red-400" >{loginError}</p>}
          </div>
          <div className="mt-6">
            <button onClick={handleSubmit} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              {isLoginPage ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <a onClick={() => setIsLoginPage((prev) => !prev)}
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">
              {isLoginPage ? "or sign in" : "or sign up"}
            </a>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogIn



{/* <div className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="px-4 py-2">
              רדאנטרי חברת אבטחת מידע
              בעולם שבו איומי הסייבר מופנים אל כלל המגזרים והתעשיות,
              אנחנו ברד-אנטרי מזהים את סיכוני האבטחה, עוזרים לכם לקבל החלטות עסקיות נבונות, וכך מאפשרים לכם לצמצם את שטח ההתקפה באופן דיגיטלי, פיזי ואנושי.

              בואו יחד איתנו לבדוק את עד כמה מעטפת ההגנה שלכם חזקה בפני האיומים ההולכים וגדלים. רדאנטרי משתמשת בכלים המתקדמים ביותר על מנת לסייע ללקוחות שלנו במניעת מתקפות סייבר, ביניהם מבדקי חדירות יסודיים הנועדו לבחון את חולשות מערך ההגנה שלכם מנקודת מבטו של תוקף זדוני.

              צוות המומחים שלנו יעזור לכם להגיע להחלטות העסקיות הנכונות עבורכם ולצמצם את הסיכונים האפשריים.

              הצטרפו אלינו במשמיתנו להפוך את עולם הסייבר למקום בטוח יותר.


            </div>
          </div> */}
{/*   
          <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
  
              <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                  with email</a>
  
              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div> */}