import Table from "../../components/UI/Table.tsx";
import {useEffect, useState} from "react";
import {GetAllContests} from "../../api/utils.ts";
import {Contest} from "../../types/types.ts";

export default function ContestList() {
    const [contests, setContests] = useState([] as Contest[]);
    useEffect(() => {
        GetAllContests().then((res) => {
            setContests(res);
        })
    }, []);
    return (
        <div className={"container"}>
            <Table
                elements={contests}
                table_fields={[
                    {
                        name: "name",
                        label: "Название"
                    },
                    {
                        name: "start_time",
                        label: "Дата начала",
                        valueProcessing: (el: any) => { return new Date(el).toLocaleString("ru-RU")}
                    },
                    {
                        name: "end_time",
                        label: "Дата окончания",
                        valueProcessing: (el: any) => { return new Date(el).toLocaleString("ru-RU")}
                    },
                    {
                        name: "id",
                        label: "Участвовать",
                        button: {
                            onClick: (el: any) => {
                                console.log(el)
                            },
                            text: "Участвовать"
                        }

                    }
                ]}
            />
        </div>
    )
}