import { Link } from "react-router-dom";
export function Error404() {
    document.title = "404";
    return <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="card alert alert-danger">
                    <div className="card-body">
                        <div className="text-center">
                            <h1 className="display-5">
                                <b>404</b>
                            </h1>
                            <h2 className="display-6">
                                <b>Page Not Found!</b>
                            </h2>
                            <p className="lead">
                                <b>Either something went wrong or this page doesn't exist anymore.</b>
                            </p>
                            <Link to="/">
                                <b>Home Page</b>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}