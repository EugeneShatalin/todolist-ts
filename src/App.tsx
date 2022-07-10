import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: string
}

type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milck', isDone: true},
            {id: v1(), title: 'JS course', isDone: true},
            {id: v1(), title: 'ReactJS book', isDone: false},
        ]
    })

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all'
        },
    ])

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasksObj[todolistId];
        tasksObj[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        const task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasksObj[todolistId];
        tasksObj[todolistId] = [task, ...todolistTasks]
        setTasksObj({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasksObj[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id));
        delete tasksObj[id];
        setTasksObj({...tasksObj})
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, todolist])

        setTasksObj({
            ...tasksObj,
            [todolist.id]: [],
        })
    }

    function changeTaskTitle (id: string, newTitle: string,  todolistId: string) {
        let todolistTasks = tasksObj[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasksObj({...tasksObj});
        }
    }

    function changeTodolistTitle(newTitle: string,  id: string) {
     const todolist = todolists.find(t => t.id === id);
         if(todolist){
             todolist.title = newTitle;
             setTodolists([...todolists]);
         }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone === false);
                    }

                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone === true);
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={tl.filter}
                        changeTaskStatus={changeStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );

}

export default App;
