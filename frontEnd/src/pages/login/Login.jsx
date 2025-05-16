
// import axios from "axios";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import "./login.css";

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: undefined,
//     password: undefined,
//   });

//   const { loading, error, dispatch } = useContext(AuthContext);

//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//       navigate('/')
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
//     }
//   };


//   return (
//     <div className="login">
//       <div className="lContainer">
//         <input
//           type="text"
//           placeholder="username"
//           id="username"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <input
//           type="password"
//           placeholder="password"
//           id="password"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <button disabled={loading} onClick={handleClick} className="lButton">
//           Login
//         </button>
//         {error && <span className="logmssg">{error.message}</span>}
//       </div>
//     </div>
//   );
// };

// export default Login;

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [registerData, setRegisterData] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (isRegistering) {
      setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    } else {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/');
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", registerData);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      // Switch back to login form after successful registration
      setIsRegistering(false);
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        {isRegistering ? (
          <>
            <h2>Register</h2>
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
              className="lInput"
            />
            <input
              type="email"
              placeholder="email"
              id="email"
              onChange={handleChange}
              className="lInput"
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
            <button disabled={loading} onClick={handleRegister} className="lButton">
              Register
            </button>
            <p>
              Already have an account?{" "}
              <button className="toggleForm" onClick={() => setIsRegistering(false)}>
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
              className="lInput"
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
            <button disabled={loading} onClick={handleLogin} className="lButton">
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <button className="toggleForm" onClick={() => setIsRegistering(true)}>
                Register
              </button>
            </p>
          </>
        )}
        {error && <span className="logmssg">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
