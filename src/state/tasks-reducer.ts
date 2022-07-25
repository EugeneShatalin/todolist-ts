import {FilterValuesType, TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    idTask: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionsTypes = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.idTask)
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.status;
            }
            return stateCopy;
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};

            stateCopy[action.todolistId] = [];

            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};

            delete stateCopy[action.id];

            return stateCopy;
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (idTask: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', idTask, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}