import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "./reusables/Input/Input";
import DatePicker from "./reusables/Input/DatePicker";
import Button from "./reusables/Button/Button";
import SelectInput from "./reusables/Input/SelectInput";
import { addTask, getAssignedUsers, getSingleTask, getTasks, IAssignedUser, showTaskForm, updateTask } from "../store/slices/task.slice";
import { useAppDispatch } from "../store/hooks";
import { getTimeZone, HMStoInteger, IntegerToHMS, toHHMM } from "../utils/helperFunctions";
import { useSelector } from "react-redux";
import { persistor, RootState } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface TaskFormProps {
	task_desc:string;
    task_date:string;
    task_time:string;
    task_assignedUser:string;
}

const TaskForm = () => {
    const {task,assigned_users,editing} = useSelector((state: RootState) => state.task);
    const [taskDesc,setTaskDesc] = useState(task.task_msg)
    const [time,setTime] = useState(task.task_time != undefined ? IntegerToHMS(task.task_time) : '')
    const [date,setDate] = useState(task.task_date != undefined ? task.task_date.toString() : '')
    const [assignedUser,setAssignedUser] = useState(task.assigned_user)
    const [assignedUsers,setAssignedUsers] = useState<[IAssignedUser]>() || []
    const dispatch = useAppDispatch()
    const {user,token} = useSelector((state: RootState) => state.auth);
    

    function save() {
        let task_time = HMStoInteger(time+":00");
        let time_zone = HMStoInteger(getTimeZone()+":00");
        let task_msg = taskDesc;
        let task_date = date;
        let assigned_user = assignedUser;
        let is_completed = 0;
        let body = {task_msg,task_date,task_time,assigned_user,is_completed,time_zone};
        let task_id = task.id

        if (!editing) {
            dispatch(addTask({token,user,body}))
        }else{
            dispatch(updateTask({token,user,task_id,body}))
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
                    <Input
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        name="date"
                        type="date"
                        id="date"
                        label="Date"
                        placeholder="Date"
                    />

                    {/* <DatePicker/> */}

                    <Input
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        name="time"
                        type="time"
                        id="time"
                        label="Time"
                        placeholder="Time"
                    />
                </div>

                <div className="mt-10">
                    {/* <Input
                        onChange={(e) => setAssingUser(e.target.value)}
                        value={assingUser}
                        name="task_description"
                        type="text"
                        id="task_description"
                        label="Assign User"
                        placeholder="Description"
                    /> */}

                    
                    <SelectInput
                        id="select"
                        name="select"
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
                        {!editing || <FontAwesomeIcon icon={solid('trash')} className="text-sm"/>}
                    </div>
                    <div className="col-span-4 flex justify-between items-center">
                        <Button onClick={() => dispatch(showTaskForm(false))}>Cancel</Button>
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
`;

export default TaskForm;