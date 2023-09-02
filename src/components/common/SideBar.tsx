import "bootstrap/dist/js/bootstrap.bundle.min";
import {useState} from "react";
import {SideBarElement} from "./SideBarElement.tsx";
import {SideBarElementType} from "../../types/types.ts";

export default function SideBar({elements}: { elements: SideBarElementType[] }) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    return (
        <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary full-height"
             onMouseEnter={(el) => {
                 setTooltipOpen(true)
             }}
             onMouseLeave={() => {
                 setTooltipOpen(false)
             }}
        >
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                {elements.map((el, index) => <SideBarElement key={index} text={el.text} icon={el.icon} tooltipOpen={tooltipOpen} href={el.href}/>)}
            </ul>
            <div className="dropdown border-top">
                <a href="#"
                   className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle" style={{"fontSize": "24px"}}></i>
                </a>
                <ul className="dropdown-menu text-small shadow">
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>
    )
}