import {ReactNode} from "react";

export default function Card({children, additionalClasses}: { children?: ReactNode, additionalClasses?: string }) {
    return (
        <div className={`card ${additionalClasses}`}>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}