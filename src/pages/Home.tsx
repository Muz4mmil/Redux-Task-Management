import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()
  return (
    <div className="h-screen grid place-items-center">
      <button onClick={() => navigate('/tasks')} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">Open Task Dashboaord</button>
    </div>
  )
}

export default Home