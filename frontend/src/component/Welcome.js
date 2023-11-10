import { Link } from "react-router-dom";
export function Welcome({ isLoggedIn, user }) {
    return <div className="container my-5">
        {!isLoggedIn ?
            <>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <div className="text-center">
                                    <h1 className="display-5">
                                        <b>Welcome</b>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-4">
                        <div className="feature">
                            <h3>Create Notes</h3>
                            <p>Easily create and manage your notes in one place.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature">
                            <h3>Edit and Update</h3>
                            <p>
                                Edit your notes, update content, and keep your information
                                up-to-date.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature">
                            <h3>Delete Notes</h3>
                            <p>Remove notes you no longer need with a simple click.</p>
                        </div>
                    </div>
                </div>
            </>
            :
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card alert alert-success">
                        <div className="card-body">
                            <div className="text-center">
                                <h1 className="display-6 text-capitalize">
                                    <b>Hi, {user.name}</b>
                                </h1>
                                <p className="lead">
                                    <b>Create, edit, delete your own Notes</b>
                                </p>
                                <Link className="btn btn-primary" to="/notes">
                                    <b>Notes</b>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}