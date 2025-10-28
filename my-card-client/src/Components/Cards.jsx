import React from "react";
import { useLoaderData } from "react-router";

const Cards = () => {
  const cards = useLoaderData();
  console.log(cards)
  return (
    <div>
      <h1>ToTal : {cards.length}</h1>
    </div>
  );
};

export default Cards;
