import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskCard from "./TaskCard";
import { useAppDispatch } from "../store/hooks";
import { getTasks, ITask } from "../store/slices/task.slice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const TaskList = () => {
    const dispatch = useAppDispatch()
    const {user,token} = useSelector((state: RootState) => state.auth);
    const {tasks} = useSelector((state: RootState) => state.task);

    useEffect(() => {
        dispatch(getTasks({token,user}))
    },[])
    return (
        <Card className="">
            {tasks.map((task:ITask,i) =>  
                <TaskCard key={i} task={task}/>
            )}
        </Card>
    )
}

const Card = styled.div`
    
`;

export default TaskList;
