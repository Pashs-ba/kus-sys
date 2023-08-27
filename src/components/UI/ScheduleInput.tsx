import {ScheduleFieldType} from "./types.ts";
import {useEffect, useState} from "react";
import {ScheduleElement} from "./ScheduleElement.tsx";

export default function ScheduleInput({
                                          required,
                                          disabled,
                                          additionalClasses,
                                          value,
                                          onInput
                                      }: ScheduleFieldType) {
    const [schedule, setSchedule] = useState([0, 0, 0, 0, 0, 0, 0] as any);
    const weekdays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    useEffect(() => {
        const new_schedule = [0, 0, 0, 0, 0, 0, 0];
        value?.split(" ").map((el) => {
            if (el) {
                new_schedule[Number(el) - 1] += 1
            }
        })
        setSchedule(new_schedule);
    }, [value])
    function SendInput(schedule: number[]) {
        let ans  = [] as Number[]
        schedule.map((el, index)=>{
            for (let i = 0; i<el; i++){
                ans.push(index+1)
            }
        })
        if (onInput) {
            onInput(ans.join(" "))
        }
    }
    return (
        <div className={`${additionalClasses} `}>
            {
                weekdays.map((el, index) => {
                    return <ScheduleElement weekday={el} value={schedule[index]} key={index} onInput={(el)=>{
                        const new_schedule = [...schedule];
                        new_schedule[index] = el?Number(el):0;
                        setSchedule(new_schedule);
                        SendInput(new_schedule)
                    }}/>
                })
            }
        </div>
    );

}