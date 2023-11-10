import { useEffect, useState, useRef } from "react";
import { Loader } from "./Loader";
import { Card } from "./Card";
import { Alert } from "./Alert";

export function Notes({ token }) {

    document.title = "Notes";

    const createCloseBtnRef = useRef(null);
    const deleteCloseBtnRef = useRef(null);
    const editCloseBtnRef = useRef(null);
    const editTitleRef = useRef(null);
    const editContentRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setConent] = useState("");
    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState({
        msg: "", color: ""
    });
    const [deleteMsg, setDeleteMsg] = useState({
        msg: "", color: ""
    });
    const [editMsg, setEditMsg] = useState({
        msg: "", color: ""
    });
    const [readData, setReadData] = useState({});

    // notes level
    function getIntialNotes() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };
        fetch("https://spectacular-capybara-0bd5b5.netlify.app/api/notes", requestOptions)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 500) {
                    return res.json().then((result) => {
                        setMessage({
                            msg: result.message,
                            color: "alert-danger"
                        });
                    });
                } else {
                    // Handle other status codes or errors
                    setMessage({
                        msg: res.status.message,
                        color: "alert-danger"
                    });
                }
            })
            .then((result) => {
                if (result) {
                    setNotes(result.notes);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log("catch block--", error);
            });
    }
    function createNote(event, { title, content }) {
        event.preventDefault();
        setIsFetching(true);
        if (title.trim() == "" || content.trim() == "") {
            setMessage({
                msg: "Please enter each field",
                color: "alert-danger"
            });
            setIsFetching(false);
            return;
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content })
        };
        fetch("https://spectacular-capybara-0bd5b5.netlify.app/api/notes", requestOptions)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 500) {
                    return res.json().then((result) => {
                        setMessage({
                            msg: result.message,
                            color: "alert-danger"
                        });
                        setIsFetching(false);
                    });
                } else {
                    // Handle other status codes or errors
                    setMessage({
                        msg: res.status,
                        color: "alert-danger"
                    });
                    setIsFetching(false);
                }
            })
            .then((result) => {
                if (result) {
                    setMessage({
                        msg: result.message,
                        color: "alert-success"
                    });
                    setNotes([result.note, ...notes]);
                    setIsFetching(false);
                    setTimeout(() => {
                        createCloseBtnRef.current.click();
                        setMessage({
                            msg: "",
                            color: ""
                        });
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log("catch block--", error);
            });
        setTitle("");
        setConent("");
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
    }
    // card level 
    function readNote(note) {
        setReadData(note);
        // readData is undefined here.
        editTitleRef.current.value = note.title;
        editContentRef.current.value = note.content;
    }
    function deleteNote(note) {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }
        setIsFetching(true)
        fetch(`https://spectacular-capybara-0bd5b5.netlify.app/api/notes/${note._id}`, requestOptions)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 500) {
                    return res.json().then((result) => {
                        setDeleteMsg({
                            msg: result.message,
                            color: "alert-danger"
                        });
                        setIsFetching(false);
                    });
                } else {
                    // Handle other status codes or errors
                    setDeleteMsg({
                        msg: res.status,
                        color: "alert-danger"
                    });
                    setIsFetching(false);
                }
            })
            .then((result) => {
                if (result) {
                    setIsFetching(false);
                    setDeleteMsg({
                        msg: result.message,
                        color: "alert-success"
                    });
                    let new_notes = notes.filter(function (ele) {
                        return ele._id !== note._id;
                    });
                    setNotes(new_notes);
                    // Clear the message after a successful signup
                    setTimeout(() => {
                        setDeleteMsg({
                            msg: "",
                            color: ""
                        });
                        deleteCloseBtnRef.current.click();
                    }, 2000);
                }
            })
            .catch((error) => {
                console.log("catch block--", error);
            });
    }
    function editNote(event) {
        event.preventDefault();
        setIsFetching(true);
        if (title.trim() == "" || content.trim() == "") {
            setEditMsg({
                msg: "No Changes Detect, Alter Both Field",
                color: "alert-danger"
            });
            setIsFetching(false);
            return;
        }
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content })
        };
        fetch(`https://spectacular-capybara-0bd5b5.netlify.app/api/notes/${readData._id}`, requestOptions)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 500) {
                    return res.json().then((result) => {
                        setEditMsg({
                            msg: result.message,
                            color: "alert-danger"
                        });
                        setIsFetching(false);
                    });
                } else {
                    // Handle other status codes or errors
                    setEditMsg({
                        msg: res.status,
                        color: "alert-danger"
                    });
                    setIsFetching(false);
                }
            })
            .then((result) => {
                if (result) {
                    setIsFetching(false);
                    setEditMsg({
                        msg: result.message,
                        color: "alert-success"
                    });
                    notes[readData.index] = result.note;
                    setTimeout(() => {
                        editCloseBtnRef.current.click();
                        setEditMsg({
                            msg: "",
                            color: ""
                        });
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log("catch block--", error);
            });
        setTitle("");
        setConent("");
        editTitleRef.current.value = "";
        editContentRef.current.value = "";
        setReadData({});
    }
    useEffect(() => {
        getIntialNotes();
    }, []);

    return <div className="container my-5">
        <div className="d-flex align-items-center px-2 mb-1">
            <h1 className="m-0">Notes</h1>
            <div className="ms-auto">
                <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#createModal">Create</button>
            </div>
        </div>
        <div className="row">
            {isLoading ? <Loader /> :
                notes.length > 0 ?
                    notes.map((ele, i) => {
                        return <div key={i} className="col-sm-12 col-md-6 col-lg-3">
                            <Card index={i} note={ele} readNote={readNote} deleteNote={deleteNote} />
                        </div>
                    }) : <div className="col-12">
                        <h1 className="text-center bg-light rounded py-5 my-3 border border-dark">You don't have notes</h1>
                    </div>
            }
        </div>
        {/*Create Modal*/}
        <div className="modal" id="createModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create New Note</h5>
                        <button type="button" ref={createCloseBtnRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            isFetching ? <Loader /> : message.msg !== "" && (
                                <Alert message={message} setMessage={setMessage} />
                            )
                        }
                        <form onSubmit={(e) => createNote(e, { title, content })}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Note Title</label>
                                <input type="text" id="title" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Note Content</label>
                                <textarea id="content" className="form-control" onChange={(e) => setConent(e.target.value)} />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="mx-2 btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* Read Modal */}
        <div className="modal" id="readModal" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            {readData.title}
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>
                    <div className="modal-body">
                        {readData.content}
                    </div>
                </div>
            </div>
        </div>
        {/* Edit Modal */}
        <div className="modal" id="editModal" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Edit Note</h1>
                        <button type="button" ref={editCloseBtnRef} className="btn-close" data-bs-dismiss="modal" />
                    </div>
                    <div className="modal-body">
                        {
                            isFetching ? <Loader /> : editMsg.msg !== "" && (
                                <Alert message={editMsg} setMessage={setEditMsg} />
                            )
                        }
                        <form onSubmit={(e) => editNote(e)}>
                            <div className="mb-3">
                                <label htmlFor="edit-title" className="form-label">Note Title</label>
                                <input type="text" id="edit-title" ref={editTitleRef} className="form-control" onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edit-content" className="form-label">Note Content</label>
                                <textarea id="edit-content" ref={editContentRef} className="form-control" onChange={(e) => setConent(e.target.value)} />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="mx-2 btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* Delete Modal */}
        <div className="modal" id="deleteModal" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-none">
                        <h1 className="modal-title fs-5">Delete Modal</h1>
                        <button type="button" ref={deleteCloseBtnRef} className="btn-close" data-bs-dismiss="modal" />
                    </div>
                    <div className="modal-body p-0">
                        {
                            isFetching ? <Loader /> : deleteMsg.msg !== "" && (
                                <Alert message={deleteMsg} mb={"mb-0"} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}