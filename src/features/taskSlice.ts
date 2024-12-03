import { createSlice } from "@reduxjs/toolkit";

interface Task {
  id: number,
  title: string,
  description: string,
  completed: boolean,
  dueDate: string
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: <Task[]>[]
  },
  reducers: {
    addTask: (state, action) => {
      const newTask: Task = {
        id: state.tasks.length + 1,
        ...action.payload
      }
      state.tasks.push(newTask)
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      state.tasks[index] = action.payload
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    toggleCompleted: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload)
      state.tasks[index].completed = !state.tasks[index].completed
    }
  }
})


export const { addTask, updateTask, deleteTask, toggleCompleted } = taskSlice.actions
export default taskSlice.reducer