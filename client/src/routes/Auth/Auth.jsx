import React, { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button/button';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'
import {useLocation} from 'react-router-dom';
import { UserContext } from '../../context/context';
import { LoginFailure, LoginStart, LoginSuccess } from '../../context/actions';
import axios from 'axios'
import Alerts from '../../components/Alert/Alerts';

function Auth() {
    const pathname = useLocation().pathname;
    const value = pathname.indexOf('register') !== -1;
    const [isLoginOrRegister, setIsLoginOrRegister] = useState(!value);
    const [alert, setAlert] = useState({show : false, msg : null, type : null});

    const {dispatch} = useContext(UserContext)

    useEffect(() => {
        window.scrollTo(0, 0)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userID')
        dispatch(LoginStart())
    }, [])

    useEffect(() => {
        const s = setTimeout(() => {
            setAlert({show : false, msg : null, type : null})
        }, 3000)

        return () => clearTimeout(s)
    }, [alert])

    const getUser = async () => {
        const token = localStorage.getItem('token')
        const userID = localStorage.getItem('userID')
        const { data } = await axios.get(`/api/v1/users/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        localStorage.removeItem('userID')
        dispatch(LoginSuccess(data))
        localStorage.setItem('user', JSON.stringify(data))
    }

  return (
    <div className="login-container">
        { 
            isLoginOrRegister ? 
            <LoginForm setIsLoginOrRegister={setIsLoginOrRegister} getUser={getUser} setAlert={setAlert}/> : 
            <RegisterForm setIsLoginOrRegister={setIsLoginOrRegister} getUser={getUser} setAlert={setAlert}/>
        }
        {alert.show && <Alerts show={alert.show} msg={alert.msg} type={alert.type}/>}
    </div>
  )
}


function RegisterForm({setIsLoginOrRegister, getUser, setAlert}){
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/v1/auth/register';
        try {
            const response = await axios.post(url, {email, password})
            setAlert({show : true, msg : "login successful", type : 'success'})
            const {token, userID} = response.data;
            localStorage.setItem('token', token)
            localStorage.setItem('userID', userID)
            await getUser()
            const s = setTimeout(() => navigate('/'), 2000)
        } catch (error) {
            console.log(error.response);
            if (error.response.data.error.code == 11000 && error.response.data.error.keyPattern.email == 1){
                setAlert({show : true, msg : "This email already exists", type : 'warning'})
                setEmail('')
                return
            }
            setAlert({show : true, msg : error.response.data.msg, type : 'danger'})
        }
    }

    return(
        <div>
            <h1 className='auth-heading'>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='vantyse@gmail.com' 
                    required onChange={(e) => setEmail(e.target.value)} value={email}  minLength='6'/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='At least 6 characters' 
                    required onChange={(e) => setPassword(e.target.value)} minLength='6' value={password}/>
                </div>
                <Button type='roundedButton' htmlType="submit" value='Register'/>
            </form>
            <h5 className='login-redirect'>Already have an account? <Link style={{textDecoration : "none"}} to='../auth'><span onClick={() => {
                setIsLoginOrRegister(true)
            }}>Login</span></Link></h5>
        </div>
    )
}

function LoginForm({setIsLoginOrRegister, getUser, setAlert}) {
    const {dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/v1/auth/login';
        try {
            const response = await axios.post(url, {email, password})
            setAlert({show : true, msg : "login successful", type : 'success'})
            const {token, userID} = response.data;
            localStorage.setItem('token', token)
            localStorage.setItem('userID', userID)
            await getUser()
            const s = setTimeout(() => navigate(-1), 2000)
        } catch (error) {
            dispatch(LoginFailure())
            localStorage.removeItem('user')
            setAlert({show : true, msg : error.response.data.msg, type : 'danger'})
        }
    }

    return(
        <div>
            <h1 className="auth-heading">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='vantyse@gmail.com' required
                    minLength={'6'} onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"  placeholder='Enter Password' required
                    minLength={'6'} onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>
                <Button type='roundedButton' htmlType="submit" value='Login'/>
            </form>
            <h5 className='login-redirect'>Don't have an account? <Link style={{textDecoration : 'none'}} to='register'><span onClick={() => {
                setIsLoginOrRegister(false)
            }}>Register</span></Link></h5>
        </div>
    )
}
export default Auth