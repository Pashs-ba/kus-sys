import MessageBlock from "../components/messages/MessageBlock.tsx";
import {GetLocalUser} from "../utils/utils.ts";
import HomePageLinkCard from "../components/homepage/HomePageLinkCard.tsx";

export default function HomePage() {
    const user = GetLocalUser();
    return (
        <div className={"container"}>
            <MessageBlock/>
            <div className={"row justify-content-center align-items-center full-height"}>
                {
                    user.role.includes("teacher") ? (
                        <>
                            <HomePageLinkCard header={"Журнал"} to={"/journal"}/>
                            <HomePageLinkCard header={"Администрирование"} to={"/admin"}/>
                        </>
                    ) : null
                }
            </div>

        </div>
    )
}