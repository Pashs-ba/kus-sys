import MessageBlock from "../components/messages/MessageBlock.tsx";
import {GetLocalUser} from "../utils/utils.ts";
import Card from "../components/UI/Card.tsx";
import {Link} from "react-router-dom";
import HomePageLinkCard from "../components/homepage/HomePageLinkCard.tsx";

export default function HomePage() {
    const user = GetLocalUser();
    return (
        <div className={"container"}>
            <MessageBlock/>
            <div className={"row justify-content-center align-items-center full-height"}>
                {
                    user.role.includes("teacher") ? (
                        <HomePageLinkCard header={"Журнал"} to={"/journal"}/>
                    ) : null
                }
            </div>

        </div>
    )
}