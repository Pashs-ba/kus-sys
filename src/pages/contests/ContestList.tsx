import Table from "../../components/UI/Table.tsx";
import {useEffect, useState} from "react";
import {GetAllContests} from "../../api/utils.ts";
import {Contest} from "../../types/types.ts";

import Latex from "react-latex";
import {useNavigate} from "react-router";

export default function ContestList() {
    const navigate = useNavigate();
    const [contests, setContests] = useState([] as Contest[]);
    useEffect(() => {
        GetAllContests().then((res) => {
            setContests(res);
        })
    }, []);
    return (
        <>
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
                                navigate(`/contest/${el}`)
                            },
                            text: "Участвовать"
                        }
                    }
                ]}
            />

        </>
    )
}