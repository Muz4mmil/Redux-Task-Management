import DeleteModal from "@/components/DeleteModal"
import TaskModal from "@/components/TaskModal"
import { RootState } from "@/store"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toggleCompleted } from "@/features/taskSlice"
import { useDispatch } from "react-redux"

interface Task {
  id: number,
  title: string,
  description: string,
  completed: boolean,
  dueDate: string
}

const TaskPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const task: Task | undefined = useSelector((state: RootState) => state.tasks.tasks.find(task => task.id === Number(id)))

  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleComplete = () => {
    dispatch(toggleCompleted(Number(id)))
  }

  return (
    task && <div className="h-screen grid place-items-center max-w-7xl mx-auto">
      <div className="w-full">
        <h1 className="text-4xl font-extrabold text-gray-700">{task.title}</h1>
        <p className="text-gray-700 my-10">{task.description}</p>

        <div className="flex gap-4 items-center">
          <p className="text-gray-700">Due Date: {task.dueDate}</p>
          <div className={`${task.completed ? "bg-green-100 text-green-600" : task.dueDate < new Date().toISOString() ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-500"} rounded-full font-medium px-4 py-1`}>
            {task.completed ? "Completed" : task.dueDate < new Date().toISOString() ? "Overdue" : "Pending"}
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={handleComplete}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mr-10"
          >
            Mark as {task.completed ? "Incomplete" : 'Completed'}
          </button>
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setIsDeleting(true)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>

      {isOpen && <TaskModal setOpen={setIsOpen} type={"Edit"} id={task.id} />}
      {isDeleting && <DeleteModal setOpen={setIsDeleting} id={task.id} />}
    </div>
  )
}

export default TaskPage