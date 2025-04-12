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
        <div className={`${isListOpen && sites.length ? "h-[100px]" : "h-0"} scroll-bar flex gap-5 overflow-x-scroll duration-300 overflow-hidden mt-3`}>
            {
                sites.map(({ icon , label, url }, index) => {
                    return <div key={index} className="w-16 cursor-pointer" onClick={() => window.open(url)}>
                        <img src={icon} alt={label} className="aspect-square object-cover rounded-2xl"/>
                        <p className="truncate text-xs mt-2 text-center">{label}</p>
                    </div>
                })
            }
        </div>
    </Fragment>
}