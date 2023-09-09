import {Link} from "react-router-dom";
import {Tooltip} from "@mui/material";

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
                    <Tooltip title={<div className={"fs-6"}>{text}</div>} placement="right">
                        <i className={`bi ${icon}`} style={{"fontSize": "24px"}}/>
                    </Tooltip>
                </div>

            </Link>
        </li>
    )
}