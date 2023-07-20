import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h1 className={"text-center display-1 pt-3"}> 404</h1>
            <h2 className={"text-center"}>Страница не найдена</h2>
            <p className={"text-secondary text-center"}>Вернуться на <Link to={"/"}>главную</Link></p>
        </>
    )
}