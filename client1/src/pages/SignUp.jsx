// sign up with 3 input and signup button
import { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {

    // handle sign up logic here
  };

  return (
    <div 
      className=" p-4 max-w-lg max-auto  ">
      <h1 className="font-bold text-3xl sm:xl text-center items-center justify-center my-6">Sign Up</h1>
      <form 
      className="flex flex-col gap-3"
      onSubmit={handleSignUp}>
        <input
          type="text"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-3 rounded-lg "
        />

        <input
          type="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-3 rounded-lg "
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg "
          required
        />
        <button 
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg font-semibold tracking-wide uppercase shadow-md cursor-pointer 
          disabled:opacity-60 transition duration-200 ease-in-out focus:
          " type="submit">Sign Up</button>
      </form>
      <Link
        to="/sign-in">
        <p className="text-center mt-4">Already have an account? Sign In</p>
      </Link>
    </div>
  );
};
export default SignUp;

      

