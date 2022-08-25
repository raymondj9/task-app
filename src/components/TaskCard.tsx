import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ITask, setEditing, setTask, showTaskForm } from "../store/slices/task.slice";
import { useAppDispatch } from "../store/hooks";
import { formatDate, timeCheck } from "../utils/helperFunctions";

interface TaskCardProps {
    task:ITask
}

const TaskCard: React.FC<TaskCardProps> = ({task}) => {
    const dispatch = useAppDispatch()
    function edit() {
        dispatch(setTask(task))
        dispatch(showTaskForm(true))
        dispatch(setEditing(true))
        // alert(task.icon)
    }
    return (
        <Card className="grid grid-cols-6">
            <div className="col-span-4">
                <img src={task.icon} />
                <div>
                    <div className="font-semibold">{task.task_msg}</div>
                    <div className="text-red-500 text-sm">{formatDate(task.task_date)}</div>
                </div>
            </div>
            <div className="col-span-2 grid grid-cols-3 items-center gap-x-2 task-actions">
                <div className="drop-shadow-md" onClick={edit}><FontAwesomeIcon icon={solid('pen')} className="text-sm"/></div>
                <div className="drop-shadow-md"><FontAwesomeIcon icon={solid('bell')} className="text-sm"/></div>
                <div className="drop-shadow-md"><FontAwesomeIcon icon={solid('check')} className="text-sm"/></div>
            </div>
        </Card>
    )
}

const Card = styled.section`
	border-bottom: 1px solid #ececec;
    padding: 4px 10px;

    & .task-actions div {
        border: 1px solid #ccc;
        text-align: center;
        padding: 4px 0;
        border-radius: 4px;
        cursor: pointer;
    }

    & .task-actions div svg {
        font-size: 12px;
    }

    & .card-title {
        background-color: #fff;
        border-bottom: 1px solid #c5c2c2;
        padding: 6px 8px;
        display: flex;
        justify-content: space-between;

        & span {
            font-size: 1.1em;
        }

        & span:last-of-type {
            color: #bdd;
            margin-left: 8px;
        }

        & .add-task {
            font-size: 2em;
        }
    }

    & .card-body {
        border-bottom: 1px solid #c5c2c2;
    }
`;

export default TaskCard;
