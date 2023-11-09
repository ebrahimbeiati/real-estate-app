
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess,signInFailure,} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";



const SignIn = () => {
  const [formData, setFormData] = useState("");
  const{loading,error} =useSelector((state)=>state.user)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
     
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
     
    }
  };

  console.log(formData);
  return (
    <div className=" p-4 max-w-lg mx-auto   ">
      <h1 className="font-bold text-4xl sm:xl text-center  my-6">
        Sign In
      </h1>
      <form className="flex flex-col gap-3  justify-center" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="email"
          onChange={handleSignIn}
          required
          className="border p-3 rounded-lg "
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handleSignIn}
          className="border p-3 rounded-lg "
          required
        />
        <button
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg font-semibold tracking-wide uppercase shadow-md cursor-pointer disabled:opacity-60 transition duration-200 ease-in-out focus:"
          type="submit"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div>
        <Link to="/sign-up">
          <p className="text-center mt-4">Create an account: Sign Up</p>
        </Link>
      </div>
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
    </div>
  );
};
export default SignIn;
