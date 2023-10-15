import MessageBlock from "../components/messages/MessageBlock.tsx";
import {GetLocalUser} from "../utils/utils.ts";
import HomePageLinkCard from "../components/homepage/HomePageLinkCard.tsx";
import TableInput from "../components/UI/TableInput.tsx";

export default function HomePage() {
    const user = GetLocalUser();
    return (
        <div className={"container"}>
            <div className={"row justify-content-center align-items-center full-height"}>
                {
                    user.role.includes("teacher") ? (
                        <>
                            <HomePageLinkCard header={"Журнал"} to={"/journal"}/>
                            <HomePageLinkCard header={"Администрирование"} to={"/admin"}/>
                        </>
                    ) : null
                }
                {
                    user.role.includes("submitor") ? (
                        <>
                            <HomePageLinkCard header={"Список соревнований"} to={"/contest"}/>
                        </>
                    ) : null
                }
            </div>

        </div>
    )
}