import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import closingGap from "../../images/closingGap.jpg";
import pandamic from "../../images/pandamic.jpg";
import group from "../../images/group.jpg";
import notFound from "../../images/notFound.png";
import { Oval } from "react-loader-spinner";
import "./index.css";

const viewOptions = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Variant = () => {
  const { username } = useParams();
  const [about, setAbout] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [whyNow, setWhyNow] = useState("");
  const [activeView, setActiveView] = useState(viewOptions.loading);

  const requestUserDetailsApi = async () => {
    // const response = await fetch(
    //   `https://prodemic-backend.vercel.app/${username}`
    // );

    const response = await fetch(`https://samserver.online/${username}`);
    const data = await response.json();

    if (response.status === 200) {
      const { about, introduction, msg } = data;
      setAbout(about);
      setIntroduction(introduction);
      setWhyNow(msg);
      setActiveView(viewOptions.success);
    } else {
      // console.log("changing to failure view");
      setActiveView(viewOptions.failure);
    }
  };

  useEffect(() => {
    console.log("calling api");
    requestUserDetailsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoadingView = () => (
    <div className="loader-bg">
      <Oval
        height={60}
        width={60}
        color="#4094EF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4094EF"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );

  const renderSuccessView = () => (
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
            <p>{introduction}</p>
          </div>
        </div>
        <div className="msg-bg">
          <h2>why Now</h2>
          <div className="blog">
            <img className="blog-img-2" src={group} alt="group" />
            <p className="blog-text-2">{whyNow}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFailureView = () => (
    <div className="not-found-bg">
      <img src={notFound} alt="not found" />
      <p>Opps! We cann't find what you are looking for!</p>
    </div>
  );

  const renderFinalView = () => {
    switch (activeView) {
      case viewOptions.loading:
        return renderLoadingView();

      case viewOptions.success:
        return renderSuccessView();

      case viewOptions.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return renderFinalView();
};

export default Variant;
