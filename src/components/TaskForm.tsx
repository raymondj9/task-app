import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "./reusables/Input/Input";
import Button from "./reusables/Button/Button";
import SelectInput from "./reusables/Input/SelectInput";
import { addTask, deleteTask, getAssignedUsers, getSingleTask, getTasks, IAssignedUser, setTask, showTaskForm, updateTask } from "../store/slices/task.slice";
import { useAppDispatch } from "../store/hooks";
import { formatDate, formatTime, getTimeZone, HMStoInteger, IntegerToHMS, timeCheck, toHHMM } from "../utils/helperFunctions";
import { useSelector } from "react-redux";
import { persistor, RootState } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DefaultButton from "./reusables/Button/DefaultButton";

interface TaskFormProps {
	task_desc:string;
    task_date:string;
    task_time:string;
    task_assignedUser:string;
}

const TaskForm = () => {
    const {task,assigned_users,editing} = useSelector((state: RootState) => state.task);
    const [taskDesc,setTaskDesc] = useState(task.task_msg)
    const [date,setDate] = useState(new Date(task.task_date))
    const [time,setTime] = useState(timeCheck(task.task_time))
    const [assignedUser,setAssignedUser] = useState(task.assigned_user)
    const dispatch = useAppDispatch()
    const {user,token} = useSelector((state: RootState) => state.auth);

    function save() {
        let task_time = HMStoInteger(formatTime(time)+":00");
        let time_zone = HMStoInteger(getTimeZone()+":00");
        let task_msg = taskDesc;
        let task_date = formatDate(date,'-');
        let assigned_user = assignedUser;
        let is_completed = 0;
        let body = {task_msg,task_date,task_time,assigned_user,is_completed,time_zone};
        let task_id = task.id

        if (editing) {
            dispatch(setTask(body))   
        }

        if (!editing) {
            dispatch(addTask({token,user,body}))
        }else{
            dispatch(updateTask({token,user,task_id,body}))
        }
    }

    function removeTask() {
        let c = window.confirm("Are you sure you want to delete this task?");
        if (c) {
            let task_id = task.id
            dispatch(deleteTask({token,user,task_id}))
        }
    }

    useEffect(() => {
        dispatch(getAssignedUsers({token,user}))
    },[])

    return (
        <Wrapper>
            <form method="POST">
                <Input
                    onChange={(e) => setTaskDesc(e.target.value)}
                    value={taskDesc}
                    name="task_description"
                    type="text"
                    id="task_description"
                    label="Task Description"
                    placeholder="Description"
                />

                <div className="flex gap-x-6 mt-10">
                    <DatePicker
                        closeOnScroll={true}
                        selected={date}
                        onChange={(e: any) => setDate(e)}
                        dateFormat="dd/MM/yyyy"
                    />

                    <DatePicker
                        selected={time}
                        onChange={(date: any) => setTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                </div>

                <div className="mt-10">
                    <SelectInput
                        id="select"
                        name="select"
                        className="w-full"
                        onChange={(e) => setAssignedUser(e.target.value)}
                        value={assignedUser}
                        >
                        <option value="">Assign Task</option>
						{assigned_users.map((user:IAssignedUser,i) => 
                            <option value={user.id} key={i}>{user.name}</option>
                        )}
                    </SelectInput>
                </div>

                <div className="max-w-2xl grid grid-cols-7  gap-x-1 mt-10">
                    <div className="drop-shadow-md col-span-3 flex items-center">
                        {!editing || <FontAwesomeIcon icon={solid('trash')} className="text-sm cursor-pointer" onClick={removeTask}/>}
                    </div>
                    <div className="col-span-4 flex justify-between items-center">
                        <DefaultButton onClick={() => dispatch(showTaskForm(false))}>Cancel</DefaultButton>
                        <Button onClick={save}>Save</Button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #edf7fc;
    border-radius: 6px;
    padding: 14px;

    & .react-datepicker-wrapper input {
        font-size: 13px !important;
        padding: 8px 5px;
        border-radius: 6;
    }
`;

export default TaskForm;
