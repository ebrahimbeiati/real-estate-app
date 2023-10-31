// sign up with 3 input and signup button
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  console.log(formData);
  return (
    <div className=" p-4 max-w-lg max-auto  ">
      <h1 className="font-bold text-3xl sm:xl text-center items-center justify-center my-6">
        Sign In
      </h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
