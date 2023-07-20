import LoadingComponent from "../../components/UI/LoadingComponent.tsx";

export default function LoadingPage(){
    return (
        <div className={"container mt-3 h-100 d-flex justify-content-center align-items-center"}>
            <div>
                <LoadingComponent/>
                Страница загружается...
            </div>
        </div>
    )
}