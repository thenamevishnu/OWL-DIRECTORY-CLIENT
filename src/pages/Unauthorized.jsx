import { MdOutlineHome } from "react-icons/md"
import { useNavigate } from "react-router"

export const Unauthorized = () => {
    const redirect = useNavigate()
    return <div className="flex text-light flex-col items-center justify-center h-screen">
        <h1 className="text-2xl  font-semibold">Unauthorized</h1>
        <p className="mt-3">You are not authorized to view this page</p>
        <p>Please login to view this page</p>
        <button onClick={() => redirect("/")} className="flex items-center mt-3 cursor-pointer px-2 p-1 border-2 border-dim rounded gap-1"><MdOutlineHome size={20}/> <span>Go Home</span></button>
    </div>
}