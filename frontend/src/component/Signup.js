import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "./Loader";
import { Alert } from "./Alert";

export function Signup({ isLoggedIn }) {

  document.title = "Signup";

  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ msg: "", color: "" });
  const [isFetching, setIsFetching] = useState(false);

  function submitHandler(event) {
    event.preventDefault();
    setIsFetching(true);
    if (name === "" || email === "" || password === "") {
      setMessage({ msg: "Please Enter Each Field", color: "alert-danger" });
      setIsFetching(false);
      return;
    }
    fetch("https://spectacular-capybara-0bd5b5.netlify.app/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (res.status === 409) {
          return res.json().then((result) => {
            setMessage({ msg: result.message, color: "alert-danger" });
            setIsFetching(false);
          });
        } else if (res.status === 201) {
          return res.json().then((result) => {
            setIsFetching(false);
            setMessage({ msg: result.message, color: "alert-success" });
            // Clear the message after a successful signup
            setTimeout(() => {
              setMessage({ msg: "", color: "" });
              // go to home page
              history.push("/login");
            }, 3000);
          });
        } else if (res.status === 500) {
          return res.json().then((result) => {
            setIsFetching(false);
            setMessage({ msg: result.message, color: "alert-danger" });
          });
        } else {
          setIsFetching(false);
          setMessage({ msg: "An error occurred", color: "alert-danger" });
        }
      })
      .catch((error) => {
        setIsFetching(false);
        setMessage({ msg: error.message, color: "alert-warning" });
      });
    // resetting state and from fields
    setName("");
    setEmail("");
    setPassword("");
    document.getElementById("name").value = "";
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
                <h1 className="text-center">Sign Up</h1>
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={(e) => setName(e.target.value.trim())}
                    />
                  </div>
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
                      Sign Up
                    </button>
                    <h5>
                      Already have an account ? <Link to="/login">Log In</Link>
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
