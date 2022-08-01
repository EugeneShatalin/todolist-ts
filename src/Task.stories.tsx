import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'Task component',
    component: Task,
}

const removeTaskCallback = action("Task remove")
const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{title: 'CSS', isDone: true, id: '1'}}
            todolistId={'todolistId1'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}/>
        <Task
            task={{title: 'JS', isDone: false, id: '2'}}
            todolistId={'todolistId2'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}/>
    </>
}