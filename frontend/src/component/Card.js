export function Card({index,note,readNote,deleteNote}) {
    note.index = index;
    return <div className="card m-2">
        <div className="card-body">
            <div className="d-flex align-items-center mb-2">
                <h5 className="card-title m-0 text-truncate"
                    style={{
                        cursor: "pointer"
                    }}
                    data-bs-toggle="modal" data-bs-target="#readModal"
                    onClick={()=>readNote(note)}
                >{note.title}</h5>
                <div className="btn-group ms-auto">
                    <button
                        type="button"
                        className="btn btn-sm btn-light rounded-circle p-1 lh-1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16"
                        >
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <button
                                className="d-flex align-items-center gap-2 dropdown-item"
                                type="button"
                                data-bs-toggle="modal" 
                                data-bs-target="#editModal"
                                onClick={()=>{readNote(note)}}
                            >Edit</button>
                        </li>
                        <li>
                            <button
                                className="text-danger d-flex align-items-center gap-2 dropdown-item"
                                type="button"
                                data-bs-toggle="modal" 
                                data-bs-target="#deleteModal"
                                onClick={()=>deleteNote(note)}
                            >Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="card-text">{note.content}</p>
        </div>
    </div>
}