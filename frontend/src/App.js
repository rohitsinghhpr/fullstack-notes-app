import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
// components ------------------------------------------------
import { Navbar, Option1, Option2 } from "./component/Navbar";
import { Error404 } from "./component/Error404";
import { Welcome } from "./component/Welcome";
import { Signup } from "./component/Signup";
import { Login } from "./component/Login";
import { Notes } from "./component/Notes";

export default function App() {
  document.title = "Notes App";
  // state --------------------------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "username",
    "useremail",
  ]);
  // logout functionality
  function logout() {
    removeCookie("token");
    removeCookie("username");
    removeCookie("useremail");
    setIsLoggedIn(false);
    setUser({ name: "", email: "" });
  }
  // checkCookie
  function checkCookie() {
    if (cookies.token != null || undefined) {
      setIsLoggedIn("ture");
      setUser({ name: cookies.username, email: cookies.useremail });
    }
  }
  useEffect(() => {
    checkCookie();
  }, []);
  return (
    <>
      <Route path="/">
        <Navbar>
          {!isLoggedIn ? <Option1 /> : <Option2 user={user} logout={logout} />}
        </Navbar>
      </Route>
      <Switch>
        <Route exact path="/">
          <Welcome isLoggedIn={isLoggedIn} user={user} />
        </Route>
        <Route exact path="/signup">
          <Signup isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/login">
          <Login
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
            setCookie={setCookie}
          />
        </Route>
        <Route exact path="/notes">
          {!isLoggedIn ? (
            <Welcome isLoggedIn={isLoggedIn} user={user} />
          ) : (
            <Notes token={cookies.token}/>
          )}
        </Route>
        <Route exact path="/404">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}
