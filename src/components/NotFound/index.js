import search from "../../images/search.png";
import "./index.css";

const NotFound = () => (
  <div className="wrong-page-bg">
    <img src={search} alt="not Found" />
    <h1>Sorry! cann't find the page you are looking for!</h1>
  </div>
);

export default NotFound;
