import Card from "../UI/Card.tsx";
import {Link} from "react-router-dom";

export default function HomePageLinkCard({header, to}: { header: string, to: string }) {
    return (
        <div className={"col-3"}>
            <Card additionalClasses={"d-flex flex-column  align-items-center"}>
                <h3 className={"card-title text-center mb-3"}>{header}</h3>
                <Link to={to} className={"btn btn-primary text-center"}>Открыть</Link>
            </Card>
        </div>
    )
}