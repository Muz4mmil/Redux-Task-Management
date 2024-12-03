import { deleteTask } from "@/features/taskSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

interface DeleteModalProps {
  id: number,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteModal = ({ id, setOpen }: DeleteModalProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = () => {
    dispatch(deleteTask(id))
    navigate('/tasks')
  }

  return (
    <div className="absolute top-0 left-0 w-full h-screen grid place-items-center">
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"></div>
      <div className="z-20 bg-white p-5 px-6 rounded-3xl">
        <h2 className="text-2xl font-semibold">Are you sure you want to delete this task?</h2>
        <div className="flex gap-2 justify-end mt-4">
          <button onClick={() => setOpen(false)} className="border border-gray-600 hover:bg-gray-200 font-bold py-2 px-6 rounded-full">Cancel</button>
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal