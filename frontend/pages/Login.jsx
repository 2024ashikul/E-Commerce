import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../src/components/Contexts/AuthContext/AuthContext';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const {isLoggedIn,  setIsLoggedIn, setUserName} = useContext(AuthContext);
  useEffect(()=>{
    if(isLoggedIn){
    navigate('/profile');
    }
  },[isLoggedIn,navigate])

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://192.168.0.102:3000/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      setIsLoggedIn(true);
      setUserName(res.data.username);
      localStorage.removeItem('cartitems');

      navigate('/profile');
      
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
      
    }
  };

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleSubmit} className='items-center justify-center flex flex-col mt-20  p-10' >
        <div className=" flex flex-col px-10 py-5 bg-white rounded-lg shadow-lg">
          <h2 className="align-middle text-center pb-8 text-shadow-blue-500">Login to your account</h2>
          
          <div className="flex items-center gap-4 mb-6" >
            <label htmlFor="email" className='w-40 text-left'>
            Email
            </label>
            
            <input name="email" type="email"
            
            className='flex-1 w-96 px-3 py-2 rounded-md  border focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Email" value={form.email} onChange={handleChange} 

            required /> 
            
          </div>

          <div className='flex items-center gap-4 mb-6'>
            <label htmlFor="password" className='w-40 text-left'>
              Password
            </label>
            
            <input name="password" 
            
            type="password" className='flex-1 w-96 px-3 py-2 rounded-md border' placeholder="Password" value={form.password} onChange={handleChange} required />
          
          </div>
          
          
          <div className="flex justify-center ">
          <button
            type="submit"
            className="
            w-2/3 px-3 py-1
            rounded-md 
            bg-blue-600 
            text-white 
            hover:bg-blue-700 
            hover:rounded-2xl
            transition"
          >
            Login
          </button>
        </div>
          
        </div>
      </form>

      <div className='flex flex-col'>
        
        <p className='text-indigo-800 text-center text-2xl'>Don't have an account</p>
        <div className='flex justify-center '>
          <button className='justify-center items-center border w-1/5 px-5 py-1 text-white bg-gray-400 hover:scale-110 transition-transform hover:bg-blue-600'> 
            <Link to={'/signup'} style={{textDecoration : 'none',color : 'white'}}>Sign Up </Link>
          </button>
        </div>
      </div>
    </div>

  );
}
