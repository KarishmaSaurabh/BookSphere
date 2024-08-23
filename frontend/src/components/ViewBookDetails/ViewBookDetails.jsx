/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewDataDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/get-book-by-id/${id}`
      );
      setData(res.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    book_id: id,
  };

  const handleFavourites = async () => {
    const res = await axios.put(
      "http://localhost:3000/api/v1/add-book-to-favourites",
      {},
      { headers }
    );
    alert(res.data.message);
  };

  const handleCart = async () => {
    const res = await axios.put(
      "http://localhost:3000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(res.data.message);
  };
  const deleteBook = async () => {
    const res = await axios.delete("http://localhost:3000/api/v1/delete-book", {
      headers,
    });
    alert(res.data.message);
    navigate("/all-books");
  };
  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/6">
            {" "}
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800  p-12 rounded">
              <img
                src={data.url}
                alt="/"
                className="rounded h-[50vh] md:h-[60vh] lg:h-[70vh]"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="mt-4  lg:mt-0 flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start">
                  <button
                    className="bg-white rounded lg:rounded-full text-3xl text-red-500  p-3 flex items-center justify-center"
                    onClick={handleFavourites}
                  >
                    <FaHeart />
                    <span className="ms-4 lg:hidden block">Favourites</span>
                  </button>
                  <button
                    className="text-white rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-4 lg:hidden block">Add to cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="mt-4  lg:mt-0 flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start">
                  <Link
                    to={`/update-book/${id}`}
                    className="bg-white rounded lg:rounded-full text-3xl p-3 flex items-center justify-center"
                  >
                    <FaEdit />
                    <span className="ms-4 lg:hidden block">Edit</span>
                  </Link>
                  <button
                    className="text-red-500 rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-white flex items-center justify-center"
                    onClick={deleteBook}
                  >
                    <MdDeleteOutline />
                    <span className="ms-4 lg:hidden block">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-zinc-300 text-4xl font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : Rs. {data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default ViewDataDetails;
