import { IoEllipsisHorizontal } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { addMostVisited, addRecentlyVisited } from "../Redux/slices/sites.slice"
import { toaster } from "../Lib/alert"

export const ResultPreview = ({ result }) => {

    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme)

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
                <div className="shrink-0 w-[35px] h-[35px]">
                    <img src={result.icon} alt={result.host_name} className="aspect-square w-full bg-tertiary rounded-full p-1" />
                </div>
                <div className="flex text-xs flex-col">
                    <p>{result.host_name?.replace(result?.host_name?.[0], result?.host_name?.[0].toUpperCase())}</p>
                    <p>{result.origin}</p>
                </div>
            </div>
            <div>
                <IoEllipsisHorizontal className="cursor-pointer" onClick={() => toaster.error("Not implemented yet")}/>
            </div>
        </div>
        <div className="mt-1">
            <h2 className="text-xl cursor-pointer" onClick={handleClick} style={{ color: theme.link_color }}>{result.title}</h2>
            <p>{result.description}</p>
        </div>
    </div>
}