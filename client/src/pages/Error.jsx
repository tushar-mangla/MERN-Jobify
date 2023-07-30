import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  let status = error.status;
  if (status == 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>oops! page not found</h3>
          <Link to="/dashboard">back Home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>something went wrong</div>
      <h3>{error.data}</h3>
    </Wrapper>
  );
};

export default Error;
