import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "./Loader";
import { Alert } from "./Alert";

export function Login({ isLoggedIn, setIsLoggedIn, setUser, setCookie }) {

  document.title = "Login"

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ msg: "", color: "" });
  const [isFetching, setIsFetching] = useState(false);

  function submitHandler(event) {
    event.preventDefault();
    setIsFetching(true);
    if (email === "" || password === "") {
      setMessage({ msg: "Please Enter Each Field", color: "alert-danger" });
      setIsFetching(false);
      return;
    }
    fetch("https://spectacular-capybara-0bd5b5.netlify.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 400) {
          return res.json().then((result) => {
            setMessage({ msg: result.message, color: "alert-danger" });
            setIsFetching(false);
          });
        } else if (res.status === 200) {
          return res.json().then((result) => {
            setIsFetching(false);
            setMessage({ msg: result.message, color: "alert-success" });
            // Clear the message after a successful signup
            setTimeout(() => {
              setMessage({ msg: "", color: "" });
              // set cookies
              setCookie("token", result.token);
              setCookie("username", result.user.name);
              setCookie("useremail", result.user.email);
              setIsLoggedIn("ture");
              setUser({
                name: result.user.name,
                email: result.user.email,
              });
              // go to home page
              history.push("/");
            }, 1000);
          });
        } else if (res.status === 500) {
          return res.json().then((result) => {
            setMessage({ msg: result.message, color: "alert-danger" });
            setIsFetching(false);
          });
        } else {
          setMessage({ msg: "An error occurred", color: "alert-danger" });
          setIsFetching(false);
        }
      })
      .catch((error) => {
        setIsFetching(false);
        setMessage({ msg: error.message, color: "alert-warning" });
      });
    // resetting state and from fields
    setEmail("");
    setPassword("");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {isLoggedIn ? (
            <div className="card alert alert-warning">
              <div className="card-body">
                <div className="text-center">
                  <h1 className="display-6">
                    <b>Your are already logged in</b>
                  </h1>
                  <Link className="btn btn-primary" to="/notes">
                    <b>Notes</b>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                {isFetching ? <Loader /> : message.msg !== "" && (
                  <Alert message={message} setMessage={setMessage} />
                )}
                <h1 className="text-center">Log In</h1>
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={(e) => setEmail(e.target.value.trim())}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={(e) => setPassword(e.target.value.trim())}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Log In
                    </button>
                    <h5>
                      Don't have an account ? <Link to="/signup">Sign Up</Link>
                    </h5>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
