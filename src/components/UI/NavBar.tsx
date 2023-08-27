import {Link} from "react-router-dom";

export default function NavBar({title, bootstrap_icon_name}: { title: string, bootstrap_icon_name?: string }) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><i className={`bi ${bootstrap_icon_name} me-3`}/>{title}</Link>
                {/*<Link className="nav-link active" to={"/"}>Home</Link>*/}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to={"/"}>Домашняя страница</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}