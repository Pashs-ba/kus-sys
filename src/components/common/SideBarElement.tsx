import {Link} from "react-router-dom";

export function SideBarElement({
                                   tooltipOpen,
                                   text,
                                   icon,
                                   href
                               }: {
    tooltipOpen: boolean,
    text: string,
    icon: string,
    href: string
}) {
    return (
        <li className="nav-item">
            <Link to={href} className="nav-link py-3 border-bottom rounded-0">
                <div className="d-flex align-items-center justify-content-center">
                    <i className={`bi ${icon}`} style={{"fontSize": "24px"}}/>
                    <span className={`ms-2 flex-grow-1 ${!tooltipOpen ? "invisible" : ""}`}
                          style={{
                              transition: "opacity 1s visibility 1s",
                          }}
                    >{text}</span>
                </div>

            </Link>
        </li>
    )
}