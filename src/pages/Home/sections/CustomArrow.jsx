// CustomArrow.js
import React from 'react';
import { LiaArrowRightSolid } from "react-icons/lia";

const NextArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <LiaArrowRightSolid />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <LiaArrowRightSolid style={{ transform: 'rotate(180deg)' }} />
    </div>
  );
};

export { NextArrow, PrevArrow };
