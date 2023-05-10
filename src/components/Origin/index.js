import { Link } from "react-router-dom";
import "./index.css";
// import banner from "../../images/banner.jpg";
import closingGap from "../../images/closingGap.jpg";
import pandamic from "../../images/pandamic.jpg";
import group from "../../images/group.jpg";

const Origin = (props) => {
  console.log(props);

  const { about, intro, msg } = props.details;

  return (
    <div className="bg">
      <div>
        <img className="banner-img" src={closingGap} alt="banner" />
      </div>
      <div className="origin-bg">
        <div className="about-bg">
          <h1 className="">Prodemic</h1>
          <p>{about}</p>
        </div>

        <div className="intro-bg">
          <h2>Introduction</h2>
          <div className="blog">
            <img className="blog-img" src={pandamic} alt="pandamic" />
            <p>{intro}</p>
          </div>
        </div>
        <div className="msg-bg">
          <h2>Why Now ?</h2>
          <div className="blog">
            <img className="blog-img-2" src={group} alt="group" />
            <p className="blog-text-2">{msg}</p>
          </div>
        </div>
        <div>
          <h2>Want to become a superspreder!</h2>
          <div className="evolve-bg">
            <p>
              If you feel that the receiving of these thoughts, and the idea of
              a prodemic is not a waste of time, but instead recognize the value
              to be gained for each person you share it onward to. Please DO
              become a superspreader.
            </p>
            <Link to="/edit">
              <button className="evolve-btn">Evolve</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Origin;
