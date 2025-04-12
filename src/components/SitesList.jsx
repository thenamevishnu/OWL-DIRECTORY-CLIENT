import { Fragment } from "react"
import { FaChevronUp } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { addMostVisited, addRecentlyVisited } from "../Redux/slices/sites.slice"

export const SitesList = ({ isListOpen, setListOpen, field, sites, icon, title }) => {
    
    const dispatch = useDispatch()

    const handleOpen = (url) => {
        dispatch(addMostVisited({ url }));
        setTimeout(() => {
            dispatch(addRecentlyVisited({ url }));
            window.open(url, "_current");
        }, 300);    
    }
    
    return <Fragment>
        <div className="flex justify-between items-center">
            <div><h3 className="flex items-center gap-2 text-md xxs:text-xl font-medium">{icon} {title}</h3></div>
            <div>
                <FaChevronUp className={`${isListOpen ? "rotate-180" : "rotate-0" } transition-transform duration-300 ease-linear`} cursor={"pointer"} onClick={() => setListOpen(val => ({...val, [field]: !val[field]}))}/>
            </div>
        </div>
        <div className={`${isListOpen && sites.length ? "h-[110px]" : "h-0"} scroll-bar flex gap-5 items-center overflow-x-scroll duration-300 overflow-hidden mt-3`}>
            {
                sites && sites.sort((a, b) => b.visited - a.visited).map(({ icon, title, url, visited }, index) => {
                    return <div key={index} className="w-16 relative cursor-pointer" onClick={() => handleOpen(url)}>
                        {visited && <div className="absolute -top-1 -right-1 text-xs text-white bg-black/30 w-4 rounded-full flex justify-center items-center h-4">{visited}</div>}
                        <img src={icon} alt={title} className="aspect-square object-cover rounded-2xl w-16 bg-white/5 p-2" />
                        <p className="truncate text-xs mt-2 text-center">{title}</p>
                    </div>
                })
            }
        </div>
    </Fragment>
}