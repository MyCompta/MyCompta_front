import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="utility-page">
      <div className="utility-page-box">
        <p className="utility-page-box__title">404</p>
        <p className="utility-page-box__subtitle">PAGE NOT FOUND</p>
        <Link to="/" className="utility-page-box__btn btn">
          Back to the HOME page
        </Link>
      </div>
    </div>
  );
};

export default Page404;
