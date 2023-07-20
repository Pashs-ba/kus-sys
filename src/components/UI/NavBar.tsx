import {Link} from "react-router-dom";

export default function NavBar({title, bootstrap_icon_name}: { title: string, bootstrap_icon_name?: string }) {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><i className={`bi ${bootstrap_icon_name} me-3`}/>{title}</Link>
            </div>
        </nav>
    )
}