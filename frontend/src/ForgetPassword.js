import React,{useState} from 'react'
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { forgetPassword } from '../src/api/authrization.js'

function ForgetPassword() {
  const navigator=useNavigate()
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      } else {
          try {
            const inputdata = { email, newPassword: password };
            const { data } = await forgetPassword(inputdata);
            alert(data.message);
            navigator("/login");
          } catch (error) {
            alert(error.message);
            console.error("Error signing up:", error);
          }
      }
    
    };
   return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-300 p-8 ">
    <h1 className="text-4xl font-extrabold text-center text-blue-500 mb-8">Forget Password</h1>

    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your Password"
          className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <Link to="/signup" className="text-blue-500 hover:underline">Don't have an account?</Link>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
      >
        Login
      </button>
    </form>
  </div>
</div>

  )
}

export default ForgetPassword
