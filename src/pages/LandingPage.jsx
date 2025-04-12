import { useState } from "react"
import { FaChevronUp, FaPlus, FaSearch, FaStar } from "react-icons/fa"
import { LuSlidersHorizontal } from "react-icons/lu"
import { MdAdsClick, MdOutlineFeedback } from "react-icons/md"
import { Header } from "../components/Header"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { SitesList } from "../components/SitesList"

const FixedBar = () => {
    return <div className="flex items-center gap-2 fixed bottom-3 right-3">
        <button className="flex gap-1 items-center text-sm border-[1px] p-1 px-2 rounded"><LuSlidersHorizontal />Customize</button>
        <button className="p-1 px-2 border-[1px] rounded text-xl"><MdOutlineFeedback/></button>
    </div>
}

export const LandingPage = () => {

    const { most_visited, recently_visited } = useSelector(state => state.sites)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isListOpen, setListOpen] = useState({
        most_visited: false,
        recently_visited: false
    })
    const [query, setQuery] = useState("")
    const redirect = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        const searchQuery = encodeURI(query)
        setQuery("")
        return redirect(`/search?q=${searchQuery}`)
    }

    return <div className="flex flex-col items-center p-2" onClickCapture={() => setIsMenuOpen(false)}>
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <FixedBar />
        <div className="w-full max-w-[700px] p-2 sm:p-10">
            <div className="flex flex-col items-center mb-5 w-full">
                <img src="./owl.png" alt="owl" className="aspect-square w-[160px]" />
                <h1 className="text-3xl tracking-wide font-secondary font-medium">OWL DIRECTORY</h1>
            </div>
            <form className="w-full mb-8" onSubmit={handleSearch}>
                <div className="w-full flex items-center bg-tertiary rounded-md">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the web using text or url..." className="w-full p-2 outline-none"/>
                    <button className="p-2 text-dim cursor-pointer"><FaSearch/></button>
                </div>
            </form>
            <SitesList
                icon={<FaStar className="text-yellow-400" />}
                field={"most_visited"}
                isListOpen={isListOpen.most_visited}
                setListOpen={setListOpen}
                sites={most_visited}
                title={"Most Visited Sites"}
            />
            <SitesList
                icon={<MdAdsClick className="text-yellow-400" />}
                field={"recently_visited"}
                isListOpen={isListOpen.recently_visited}
                setListOpen={setListOpen}
                sites={recently_visited}
                title={"Recently Visited Sites"}
            />
        </div>
    </div>
}