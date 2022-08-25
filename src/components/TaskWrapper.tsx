import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskForm from "./TaskForm";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../store/hooks";
import { showTaskForm } from "../store/slices/task.slice";
import TaskList from "./TaskList";

const TaskWrapper = () => {
    const [addTask,setAddTask] = useState(false)
    const {show_task_form,tasks} = useSelector((state: RootState) => state.task);
    const dispatch = useAppDispatch()

    return (
        <Card>
            <div className="card-title">
                <div className="flexbox items-center">
                    <span>TASKS</span>
                    <span>{tasks.length}</span>
                </div>

                <div className="add-task cursor-pointer" onClick={() => {dispatch(showTaskForm(true))}}>
                    +
                </div>
            </div>
            <div className="card-body">
                {!show_task_form? <TaskList/> : <TaskForm/>}
            </div>
        </Card>
    )
}

const Card = styled.section`
    padding: 0 0.8px;
	border: 1px solid #c5c2c2;
    width: 450px;
    border-radius: 6px;

    & .card-title {
        background-color: #fff;
        border-bottom: 1px solid #c5c2c2;
        padding: 1px 8px;
        display: flex;
        justify-content: space-between;

        & span {
            font-size: 1.1em;
        }

        & span:last-of-type {
            color: #8f9494;
            margin-left: 8px;
        }

        & .add-task {
            font-size: 2em;
            border-left: 1px solid #b1b6b6;
            padding: 0 6px;
        }
    }

    & .card-body {
        /* border-bottom: 1px solid #c5c2c2; */
    }
`;

export default TaskWrapper;
