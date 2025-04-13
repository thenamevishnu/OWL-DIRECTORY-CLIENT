import { IoEllipsisHorizontal } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { addMostVisited, addRecentlyVisited } from "../Redux/slices/sites.slice"

export const ResultPreview = ({ result }) => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(addMostVisited(result))
        setTimeout(() => {
            dispatch(addRecentlyVisited(result))
            window.open(result.url, "_current")
        }, 300);
    }

    return <div className="bg-secondary rounded p-2">
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <div className="shrink-0">
                    <img src={result.icon} alt={result.host_name} className="aspect-square w-[30px] bg-tertiary rounded-full p-1" />
                </div>
                <div className="flex text-xs flex-col">
                    <p>{result.host_name}</p>
                    <p>{result.origin}</p>
                </div>
            </div>
            <div>
                <IoEllipsisHorizontal />
            </div>
        </div>
        <div className="mt-1">
            <h2 className="text-xl cursor-pointer text-[#ADC2FC]" onClick={handleClick}>{result.title}</h2>
            <p>{result.description}</p>
        </div>
    </div>
}