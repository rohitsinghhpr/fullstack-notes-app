import { Link } from "react-router-dom";
export function Option1() {
    return <ul className="d-flex p-0 m-0 list-unstyled">
        <li className="nav-item">
            <Link className="mx-1 btn btn-light" to="/login">Login</Link>
        </li>
        <li className="nav-item">
            <Link className="mx-1 btn btn-primary" to="signup">Sign Up</Link>
        </li>
    </ul>
}
export function Option2(props) {
    return <ul className="d-flex p-0 m-0 list-unstyled">
        <li className="nav-item">
            <div className="btn-group ms-auto">
                <button
                    type="button"
                    className="btn btn-sm btn-light rounded-circle p-1 lh-1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={32}
                        height={32}
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                    </svg>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                    <div className="px-1">
                        <h6 className="text-capitalize">Hi, {props.user.name}</h6>
                        <h6>{props.user.email}</h6>
                    </div>
                    <hr className="dropdown-divider" />
                    <div className="text-center">
                        <button className="btn btn-sm btn-primary" onClick={props.logout}>Log Out</button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
}
export function Navbar({ children }) {
    return <nav className="navbar navbar-light bg-white border-bottom">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><b>Notes App</b></Link>
            {children}
        </div>
    </nav>
}