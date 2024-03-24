import React from "react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="utility-page">
      <div className="utility-page-box">
        <p className="utility-page-box__title">COMING SOON</p>
        <p className="utility-page-box__subtitle">
          This page will be available soon
        </p>
        <Link to="/" className="utility-page-box__btn btn">
          Back to the HOME page
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
