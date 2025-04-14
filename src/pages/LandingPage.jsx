import { useState } from "react"
import { FaSearch, FaStar } from "react-icons/fa"
import { LuSlidersHorizontal } from "react-icons/lu"
import { MdAdsClick, MdOutlineFeedback } from "react-icons/md"
import { Header } from "../components/Header"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { SitesList } from "../components/SitesList"
import { SearchSuggestions } from "../components/SearchSuggestions"
import { toaster } from "../Lib/alert"

const FixedBar = () => {
    return <div className="flex z-[1] items-center gap-2 fixed bottom-3 right-3">
        <button className="flex gap-1 cursor-pointer bg-secondary/20 backdrop-blur-xl items-center text-sm p-1 px-2 rounded"><LuSlidersHorizontal />Customize</button>
        <button className="p-1 px-2 cursor-pointer bg-secondary/20 backdrop-blur-xl rounded text-xl"><MdOutlineFeedback/></button>
    </div>
}

export const LandingPage = () => {

    const { most_visited, recently_visited } = useSelector(state => state.sites)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isOpen, setIsOpen] = useState({ info: false })
    const [isListOpen, setListOpen] = useState({
        most_visited: false,
        recently_visited: false
    })
    const [query, setQuery] = useState("")
    const redirect = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if(query.trim() == "") return toaster.error("Please enter a search query.")
        const searchQuery = encodeURI(query)
        setQuery("")
        return redirect(`/search?q=${searchQuery}&page=1`)
    }

    return <div className="flex flex-col items-center p-2" onClickCapture={() => { setIsMenuOpen(false);  setIsOpen(isOpen => ({...isOpen, info: false}))}}>
        <Header isMenuOpen={isMenuOpen} setIsOpen={setIsOpen} isOpen={isOpen} setIsMenuOpen={setIsMenuOpen}/>
        <FixedBar />
        <div className="w-full pb-10 max-w-[700px] sm:p-10">
            <div className="flex flex-col items-center mb-5 w-full">
                <img src="./owl.png" alt="owl" className="aspect-square w-[160px]" />
                <h1 className="text-xl xxs:text-3xl tracking-wide font-secondary font-medium">OWL DIRECTORY</h1>
            </div>
            <form className="w-full mb-8" onSubmit={handleSearch}>
                <div className="w-full flex items-center bg-tertiary/50 rounded-md relative">
                    <section className="absolute z-10 top-11 left-0 min-w-1/2 max-w-full">
                        <SearchSuggestions query={query} onSelect={(item) => setQuery(item.query)}/>
                    </section>
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
                title={"Most Visited"}
            />
            <SitesList
                icon={<MdAdsClick className="text-yellow-400" />}
                field={"recently_visited"}
                isListOpen={isListOpen.recently_visited}
                setListOpen={setListOpen}
                sites={recently_visited}
                title={"Recently Visited"}
            />
        </div>
    </div>
}