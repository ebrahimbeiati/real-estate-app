import { useState } from "react";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {currentUser} = useSelector((state)=>state.user)

  return (
    <header className="bg-slate-300 shadow-md">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:xl flex flex-wrap">
            <span className="text-slate-600">Real</span>
            <span>Estate</span>
          </h1>
        </Link>
        {/* Search Bar */}
        <form className=" sm:flex flex-wrap items-center justify-center">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Search properties..."
            className="w-24 sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 sm:flex flex-wrap text-white px-2 py-2 rounded-md"
          >
            Search
          </button>
        </form>
        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-4 text-slate-600 hover:underline">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img className="
              w-8 h-8 rounded-full object-cover
              " src={currentUser.avatar} alt="profile" />
            ) : (
              <li className="hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
        {/* Mobile Hamburger Menu */}
        <div className="sm:hidden">
          <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          {menuOpen && (
            <ul className="flex flex-col gap-4 bg-slate-300 absolute top-16 right-4 p-4 rounded-lg">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/signin">
                {currentUser ? (
                  <img src={currentUser.avatar} alt="profile" />
                ) : (
                  <li className="hover:underline">Sign in</li>
                )}
              </Link>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

