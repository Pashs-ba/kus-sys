export default function LoadingComponent() {
    return (
        <div className={"d-flex justify-content-center align-items-center"}>
            <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}