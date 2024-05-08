import React, { useContext, useState } from 'react'
import {loginUser} from '../utils/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Login = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const {handleLogin} = useContext(AuthContext)

  const handleInputChange = e => {
    setLogin({...login, [e.target.name]: e.target.value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await loginUser(login);
    if(success){
      const token = success.token;
      handleLogin(token);
      navigate("/")
      //window.location.reload();
    }else{
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("")
    }, 4000)
  }

  return (
    <section className='container col-6 my-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label className='col-sm-2 col-form-label' htmlFor="email">Email</label>
          <div className="">
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name='email' 
              value={login.email} 
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className='col-sm-2 col-form-label' htmlFor="email">Password</label>
          <div className="">
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name='password' 
              value={login.password} 
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <button 
            type='submit'
            className='btn btn-hotel'
            style={{ marginRight: "10px" }}
          >
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Don't have an account yet <Link to={"/register"}>register</Link>
          </span>
        </div>
      </form>
    </section>
  )
}

export default Login