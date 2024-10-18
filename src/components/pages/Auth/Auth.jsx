import React, { useState,useContext } from 'react'
import AuthStyle from './SignUp.module.css'
import { Link, useNavigate , useLocation} from 'react-router-dom';
import{auth} from '../../Utility/firebase'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import {DataContext} from '../../DataProvider/DataProvider'
import { Type } from '../../Utility/action.type';
import {PuffLoader} from 'react-spinners'

const Auth = () => {
  const [email, setEmail]= useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading] = useState({
    signIn:false,
    signup:false
  })

  const [{user},dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData = useLocation()
  console.log(navStateData)
  
const authHandler = async (e) =>{
  e.preventDefault();
  // console.log(e.target.name)
  if(e.target.name == 'signIn'){
    // firebase auth
    setLoading({...loading, signIn:true})
    signInWithEmailAndPassword(auth, email, password)
    .then((userInfo) =>{
      dispatch({
        type:Type.SET_USER,
        user:userInfo
      });
      setLoading({...loading,signIn:false})
      navigate(navStateData?.state?.redirect || '/')
    }).catch((err) =>{
      setError(err.message)
            setLoading({ ...loading, signIn: false });

    })

  }else{
    createUserWithEmailAndPassword(auth, email, password).then((userInfo) =>{
      setLoading(setLoading({ ...loading, signup: true }));

      dispatch({
        type: Type.SET_USER,
        user: userInfo,
      });
      setLoading(setLoading({ ...loading, signup: false }));
      navigate(navStateData?.state?.redirect || "/");
    })
    .catch((err) =>{
      setError(err.message);
               setLoading(setLoading({ ...loading, signup: false }));
    });

  }
}



  return (
    <section className={AuthStyle.login}>
      {/* logo */}
      <Link to={'/'}>
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG1.png"
          alt="amazon"
        />
      </Link>

      {/* form */}
      <div className={AuthStyle.login_container}>
        <h1>SIGN In</h1>
        {
          navStateData?.state?.msg && (<small style={{
            padding:"5px",
            textAlign: "center",
            color:"red",
            fontWeight:"bold"
          }}>
            {navStateData?.state?.msg}
          </small>)
        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
            <div>
              <label htmlFor="password">password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            <button
              name="signIn"
              onClick={authHandler}
              type="submit"
              className={AuthStyle.login_signInButton}
            >
              {loading.signIn ? (
                <PuffLoader color="#000" size={20}></PuffLoader>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of use &
          Sale. please see our privacy note Notice, our cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* Creater account btn */}
        <button
          name="signUp"
          onClick={authHandler}
          type="submit"
          className={AuthStyle.login_registerButton}
        >
          {loading.signup ? (
            <PuffLoader color="#000" size={20}></PuffLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ padding: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
