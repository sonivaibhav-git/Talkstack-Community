import { useNavigate } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate("/") // fallback route
    }
  }

  return <button onClick={handleBack} className = "hidden md:flex sticky top-5 left-5 mb-2 bg-black text-white p-2 rounded-2xl shadow-xl  "><IoMdArrowRoundBack size={24} />
</button>
}

export default BackButton