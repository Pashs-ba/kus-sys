import MessageBlock from "../../components/messages/MessageBlock.tsx";
import HomePageLinkCard from "../../components/homepage/HomePageLinkCard.tsx";

export default function AdminRoot() {
    return (
        <div className={"container"}>
            <MessageBlock/>
            <div className={"row justify-content-center align-items-center full-height"}>
                <HomePageLinkCard header={"Редактирование пользователей"} to={"/admin/user"}/>
                <HomePageLinkCard header={"Редактирование классов"} to={"/admin/grade"}/>
                <HomePageLinkCard header={"Редактирование журналов"} to={"/admin/journal"}/>
                <HomePageLinkCard header={"Редактирование планов"} to={"/admin/plan"}/>
            </div>

        </div>
    )
}