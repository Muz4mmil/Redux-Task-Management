import { addTask, updateTask } from "@/features/taskSlice"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

interface TaskModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  type: string
  id?: number
}

const TaskModal = ({ setOpen, type, id }: TaskModalProps) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  
  const task = useSelector((state: any) => state.tasks.tasks).find((task: any) => task.id === id)

  useEffect(() => {
    if (id) {
      setTitle(task.title)
      setDescription(task.description)
      setDueDate(task.dueDate)
    }
  }, [id])
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    type === "Create" ?
    dispatch(addTask({ title, description, dueDate, completed: false })) :
    dispatch(updateTask({ id, title, description, dueDate, completed: false }))

    setOpen(false)
  }

  return (
    <div className="absolute top-0 left-0 w-full h-screen grid place-items-center">
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"></div>
      <div className="z-20 bg-white p-5 px-6 rounded-3xl">
        <h2 className="text-2xl font-semibold mb-5">{type} Task</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="">Task Name</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <label htmlFor="">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Task Description"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <label htmlFor="">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <div className="flex gap-2 justify-end mt-5">
            <button onClick={() => setOpen(false)} className="font-bold py-2 px-4 rounded-full border border-gray-700">Cancel</button>
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal