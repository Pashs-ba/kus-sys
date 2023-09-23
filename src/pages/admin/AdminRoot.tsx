import MessageBlock from "../../components/messages/MessageBlock.tsx";
import HomePageLinkCard from "../../components/homepage/HomePageLinkCard.tsx";

export default function AdminRoot() {
    return (
        <div className={"container"}>
            <div className="row gy-5 justify-content-center mt-5">
                <HomePageLinkCard header={"Редактирование пользователей"} to={"/admin/user"}/>
                <HomePageLinkCard header={"Редактирование классов"} to={"/admin/grade"}/>
                <HomePageLinkCard header={"Редактирование журналов"} to={"/admin/journal"}/>
                <HomePageLinkCard header={"Редактирование планов"} to={"/admin/plan"}/>
                <HomePageLinkCard header={"Редактирование предметов"} to={'/admin/subject'}/>
                {/*<HomePageLinkCard header={"Прочие функции"} to={'/admin/other'}/>*/}
            </div>

        </div>
    )
}