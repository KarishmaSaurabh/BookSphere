/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === false) {
    links.splice(2, 2);
  }
  const [mobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://img.icons8.com/?size=100&id=XLa4HP4kJj7b&format=png&color=000000"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookSphere</h1>
        </Link>
        <div className="nav-links-booksphere block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <>
                <div className="flex items-center">
                  {items.title === "Profile" ? (
                    <Link
                      to={items.link}
                      className="px-2 py-1 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all  duration-300"
                      key={i}
                    >
                      {items.title}
                    </Link>
                  ) : (
                    <Link
                      to={items.link}
                      className="hover:text-blue-500 transition-all duration-300"
                      key={i}
                    >
                      {items.title}
                    </Link>
                  )}
                </div>
              </>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/logIn"
                className="px-2 py-1 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all  duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/signUp"
                className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all  duration-300"
              >
                SignUp
              </Link>
            </div>
          )}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() => {
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden");
            }}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className="mb-8 text-white text-3xl font-semibold hover:text-blue-500 transition-all duration-300"
            key={i}
            onClick={() => {
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden");
            }}
          >
            {items.title}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="/logIn"
              className="mb-8 text-3xl font-semibold px-8 py-2 text-white border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all  duration-300"
            >
              LogIn
            </Link>
            <Link
              to="/signUp"
              className="mb-8 text-3xl font-semibold px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all  duration-300"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
