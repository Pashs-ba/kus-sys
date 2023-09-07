import Table from "../../components/UI/Table.tsx";
import {useEffect} from "react";
import {GetAllContests} from "../../api/utils.ts";

export default function ContestList() {
    useEffect(() => {
        GetAllContests().then((res)=>{
            console.log(res)
        })
    }, []);
    return (
        <div className={"container"}>
            <Table elements={[]} table_fields={[]}/>
        </div>
    )
}