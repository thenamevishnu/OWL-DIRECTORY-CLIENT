import { Fragment } from "react"
import { FaChevronUp } from "react-icons/fa"

export const SitesList = ({ isListOpen, setListOpen, field, sites, icon, title }) => {
    return <Fragment>
        <div className="flex justify-between items-center">
            <div><h3 className="flex items-center gap-2 text-xl font-medium">{icon} {title}</h3></div>
            <div>
                <FaChevronUp className={`${isListOpen ? "rotate-180" : "rotate-0" } transition-transform duration-300 ease-linear`} cursor={"pointer"} onClick={() => setListOpen(val => ({...val, [field]: !val[field]}))}/>
            </div>
        </div>
        <div className={`${isListOpen && sites.length ? "h-[110px]" : "h-0"} scroll-bar flex gap-5 items-center overflow-x-scroll duration-300 overflow-hidden mt-3`}>
            {
                sites && sites.sort((a, b) => b.visited - a.visited).map(({ icon, host_name, url, visited }, index) => {
                    return <div key={index} className="w-16 relative cursor-pointer" onClick={() => window.open(url, "_current")}>
                        {visited && <div className="absolute -top-1 -right-1 text-xs text-white bg-black/30 w-4 rounded-full flex justify-center items-center h-4">{visited}</div>}
                        <img src={icon} alt={host_name} className="aspect-square object-cover rounded-2xl w-16 bg-white/5 p-2" />
                        <p className="truncate text-xs mt-2 text-center">{host_name}</p>
                    </div>
                })
            }
        </div>
    </Fragment>
}