export function Alert({ message, setMessage = null, mb = "" }) {
    return <div className={`alert ${message.color} alert-dismissible fade show ${mb}`} role="alert">
        <strong>{message.msg}</strong>
        {setMessage !== null && <button type="button" className="btn-close" onClick={() => setMessage({ msg: "", color: "" })} data-bs-dismiss="alert" aria-label="Close"></button>}
    </div>
}