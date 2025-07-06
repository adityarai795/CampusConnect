import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        email,
        username,
        password
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 mt-[80px]">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-blue-300">
    <h1 className="text-4xl font-extrabold text-center text-blue-500 mb-8">Sign Up</h1>

    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Username"
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

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 font-semibold hover:underline">
          Login
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>

  )
}

export default SignUp
