/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(res.data.data);
    };
    fetch();
  }, [favouriteBooks]);
  return (
    <>
      {favouriteBooks && favouriteBooks.length === 0 && (
        <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex flex-col items-center justify-center w-full">
          No Favourite Books
          <img src="./star.png" alt="start" className="h-[20vh] my-8" />
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {favouriteBooks &&
          favouriteBooks.map((item, i) => (
            <div key={i}>
              <BookCard data={item} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
