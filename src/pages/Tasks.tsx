import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import TaskModal from "@/components/TaskModal"
import TaskCard from "@/components/TaskCard"
import { Filter, Plus, Search } from "lucide-react"

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')


  const filteredTasks = useSelector((state: RootState) => {
    const tasks = state.tasks.tasks;
    const searchResult = tasks.filter((task) => {
      const taskTitle = task.title.toLowerCase();
      const taskDescription = task.description.toLowerCase();
      const searchQueryLower = searchQuery.toLowerCase();
      return taskTitle.includes(searchQueryLower) || taskDescription.includes(searchQueryLower);
    });

    switch (filter) {
      case 'all':
        return searchResult;
      case 'completed':
        return searchResult.filter((task) => task.completed);
      case 'pending':
        return searchResult.filter((task) => !task.completed && new Date(task.dueDate) >= new Date());
      case 'overdue':
        return searchResult.filter((task) => !task.completed && new Date(task.dueDate) < new Date());
      default:
        return searchResult;
    }
  });

  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      <header className="py-8 border-b ">
        <h1 className="text-5xl font-extrabold text-gray-700">Hello User, <br />Here are your Tasks</h1>
      </header>

      <div className="flex justify-between mt-5">
        <div className="flex items-center flex-wrap gap-10">
          <div className="flex items-center">
            <p className="font-medium mr-2"><Filter size={16}/> </p>
            <select
              className="w-36 px-3 py-1.5 rounded-full border-2 border-gray-400"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div className="flex items-center">
            <p className="font-medium mr-2"><Search size={16}/> </p>
            <input
              type="text"
              placeholder="Search..."
              className="w-72 px-3 py-1.5 rounded-full border-2 border-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={() => setIsOpen(true)} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"><Plus size={16}/> Create Task</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {isOpen && <TaskModal setOpen={setIsOpen} type={"Create"} />}
    </div>
  )
}

export default Tasks