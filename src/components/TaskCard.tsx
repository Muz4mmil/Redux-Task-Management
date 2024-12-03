import { toggleCompleted } from "@/features/taskSlice"
import { Calendar } from "lucide-react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

interface Task {
  id: number,
  title: string,
  description: string,
  completed: boolean,
  dueDate: string
}

const TaskCard = ({ task }: { task: Task }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleComplete = () => {
    dispatch(toggleCompleted(task.id))
  }

  return (
    <div className="border rounded-2xl border-gray-300 w-full h-full shadow-sm px-4 py-3">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className={`${task.completed ? "bg-green-100 text-green-600" : task.dueDate < new Date().toISOString() ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-500"} text-xs rounded-full font-medium px-2 py-0.5`}>
            {task.completed ? "Completed" : task.dueDate < new Date().toISOString() ? "Overdue" : "Pending"}

          </div>
          <p className="text-gray-500 text-sm flex items-center gap-1"><Calendar size={14} /> {task.dueDate}</p>
        </div>
        <div className="flex gap-1 items-center">
          <input type="checkbox" checked={task.completed} id="checkbox" onChange={handleComplete} className="h-4 w-4 cursor-pointer" />
        </div>
      </div>

      <div onClick={() => navigate(`/tasks/${task.id}`)} className="flex flex-col cursor-pointer">
        <h2 className="text-2xl font-semibold mt-2 line-clamp-1">{task.title}</h2>
        <p className="text-gray-500 line-clamp-2">{task.description}</p>
      </div>
    </div>
  )
}

export default TaskCard