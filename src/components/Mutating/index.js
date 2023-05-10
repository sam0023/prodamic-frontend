import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import closingGap from "../../images/closingGap.jpg";
import pandamic from "../../images/pandamic.jpg";
import group from "../../images/group.jpg";
import Popup from "../Popup";
import "./index.css";

const viewOptions = {
  edit: "Edit",
  failure: "FAILURE",
};

const errMsgOptions = {
  initial: "INITIAL",
  available: "Available",
  unavailable: "Unavailable",
};

const Mutating = (props) => {
  const { about, intro, msg } = props.details;
  const [heading, setHeading] = useState(about);
  const [introduction, setIntro] = useState(intro);
  const [end, setEnd] = useState(msg);
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState(errMsgOptions.initial);
  const [activeView, setActiveView] = useState(viewOptions.edit);
  const introTextareaRef = useRef(null);
  const headingTextareaRef = useRef(null);
  const endTextareaRef = useRef(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
    adjustHeadingTextareaHeight();
  };

  const adjustHeadingTextareaHeight = () => {
    if (headingTextareaRef.current) {
      headingTextareaRef.current.style.height = "auto";
      headingTextareaRef.current.style.height = `${headingTextareaRef.current.scrollHeight}px`;
    }
  };

  const handleIntroChange = (event) => {
    setIntro(event.target.value);

    adjustIntroTextareaHeight();
  };

  const adjustIntroTextareaHeight = () => {
    if (introTextareaRef.current) {
      introTextareaRef.current.style.height = "auto";
      introTextareaRef.current.style.height = `${introTextareaRef.current.scrollHeight}px`;
    }
  };

  const handleEndChange = (event) => {
    setEnd(event.target.value);
    adjustEndTextareaHeight();
  };

  const adjustEndTextareaHeight = () => {
    if (endTextareaRef.current) {
      endTextareaRef.current.style.height = "auto";
      endTextareaRef.current.style.height = `${endTextareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeadingTextareaHeight();
    adjustIntroTextareaHeight();
    adjustEndTextareaHeight();
  }, []);

  const renderFailureView = () => (
    <div>
      <p>sorry! something went wrong!!</p>
    </div>
  );

  const handlePostApi = async () => {
    const details = {
      name: username,
      about: heading,
      introduction: intro,
      msg: end,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };

    console.log(details);
    const response = await fetch(
      "https://prodemic-backend.vercel.app/edit",
      options
    );
    // const response = await fetch("http://localhost:5000/edit", options);

    if (response.status === 200) {
      navigate(`/variant/${username}`);
    } else if (response.status === 400) {
      setErrorMsg(errMsgOptions.unavailable);
      // <Popup showModal={showModal} toggleModal={toggleModal} />;
    } else {
      setActiveView(viewOptions.failure);
    }
  };

  const checkUsernameAvailabilty = async () => {
    console.log("username=", username);
    const response = await fetch(
      `https://prodemic-backend.vercel.app/${username}`
    );
    // const response = await fetch(`http://localhost:5000/${username}`);

    console.log(response);
    if (response.status === 400) {
      setErrorMsg(errMsgOptions.available);
      // console.log(response);
    } else {
      setErrorMsg(errMsgOptions.unavailable);
    }
  };

  const handleErrorMsg = () => {
    switch (errorMsg) {
      case errMsgOptions.initial:
        return null;
      case errMsgOptions.available:
        return <p className="available">*Available</p>;
      case errMsgOptions.unavailable:
        // console.log("unaavail");
        return (
          <p className="unavailable">*Sorry! this username is unavailable</p>
        );
      default:
        return null;
    }
  };

  const renderEditView = () => (
    <div className="bg">
      <div>
        <img className="banner-img" src={closingGap} alt="banner" />
      </div>
      <div className="origin-bg">
        <div className="form">
          <div className="username-form">
            <h2 className="username">ENTER A USERNAME :</h2>
            <div className="user-input-bg">
              <input
                placeholder="ENTER A USERNAME"
                className="username-input"
                value={username}
                onChange={handleUsernameChange}
              />
              {handleErrorMsg()}
            </div>

            <div>
              <button className="btn" onClick={checkUsernameAvailabilty}>
                Check availability
              </button>
            </div>
          </div>
          <div>
            <button className="save-btn" onClick={handlePostApi}>
              publish
            </button>
          </div>
        </div>
        <div className="about-bg">
          <h1 className="">Prodemic</h1>
          <textarea
            className="text-area"
            style={{ width: "90%" }}
            ref={headingTextareaRef}
            value={heading}
            onChange={handleHeadingChange}
          />
        </div>

        <div className="intro-bg">
          <h2>Introduction</h2>
          <div className="blog">
            <img className="blog-img" src={pandamic} alt="pandamic" />
            <textarea
              className="text-area"
              ref={introTextareaRef}
              value={introduction}
              style={{ width: "90%" }}
              onChange={handleIntroChange}
            />
          </div>
        </div>
        <div className="msg-bg">
          <h2>Why Now ?</h2>
          <div className="blog">
            <img className="blog-img-2" src={group} alt="group" />
            <textarea
              className="text-area"
              style={{ width: "90%" }}
              ref={endTextareaRef}
              value={end}
              onChange={handleEndChange}
            />
          </div>
        </div>
        <div className="save-btn-sm-bg">
          <button className="save-btn-sm" onClick={handlePostApi}>
            publish
          </button>
        </div>
      </div>
    </div>
  );

  const renderFinalView = () => {
    switch (activeView) {
      case viewOptions.edit:
        return renderEditView();

      case viewOptions.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return renderFinalView();
};

export default Mutating;
