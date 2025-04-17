import { useState } from "react"
import { FaSearch, FaStar } from "react-icons/fa"
import { LuSlidersHorizontal } from "react-icons/lu"
import { MdAdsClick, MdOutlineFeedback } from "react-icons/md"
import { Header } from "../components/Header"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { SitesList } from "../components/SitesList"
import { SearchSuggestions } from "../components/SearchSuggestions"
import { toaster } from "../Lib/alert"
import { setTheme } from "../Redux/slices/theme.slice"

const textColors = ["#665566", "#333333", "#ffffff", "#1a73e8", "#e91e63", "#4caf50", "#f44336", "#ff9800", "#9e9e9e", "#6a1b9a"];
const backgroundImages = ["bg-default.jpg", "bg1.png", "bg2.png", "bg3.png", "bg4.png", "bg5.png", "bg6.png", "bg7.png", "bg8.png", "bg9.png"];
const linkColors = ["#ADC2FC", "#1a0dab", "#0d6efd", "#1a73e8", "#0066cc", "#0645ad", "#2a5db0", "#3366cc", "#0077cc", "#0044cc", "#0088ff"];


const FixedBar = () => {
    
    const theme = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState({ customize: false })


    return <div className="flex z-[11] items-center gap-2 fixed bottom-3 right-3">
        <section className={`${isOpen.customize ? "h-[calc(100%-0.5rem)]  py-2":"h-0"} scroll-none duration-200 ease-linear max-w-[300px] overflow-y-scroll rounded backdrop-blur-xl bg-secondary/20 fixed bottom-1 right-1`}>
            <div className="flex p-2 flex-col gap-4 pb-12 rounded">
                <div className="sticky -top-10">
                    <h3>Preview:</h3>
                    <div className="w-full relative h-44 rounded mt-2" >
                        <img src={theme.background.replace("url(", "").replace(")", "")} alt="bg" className="object-fill rounded aspect-video"/>
                        <div className="absolute top-1/2 w-full text-center left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <p>Lorem ipsum dolor sit.</p>
                            <p style={{ color: theme.link_color }}>https://google.com</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h3>Text Color:</h3>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {
                            textColors.map(color => <button onClick={() => { dispatch(setTheme({ color })) }} key={color} style={{ backgroundColor: color }} className="w-6 h-6 rounded-full cursor-pointer"></button>)
                        }
                    </div>
                </div>
                <div className="">
                    <h3>Links Color:</h3>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {
                            linkColors.map(link_color => <button onClick={() => { dispatch(setTheme({ link_color })) }} key={link_color} style={{ backgroundColor: link_color }} className="w-6 h-6 rounded-full cursor-pointer"></button>)
                        }
                    </div>
                </div>
                <div className="">
                    <h3>Backgrounds:</h3>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {
                            backgroundImages.map(background => <div onClick={() => { dispatch(setTheme({ background: "../" + background })) }} key={background} className="w-30 rounded cursor-pointer">
                                <img src={"../"+background} alt="bg" className="object-fill h-full w-full aspect-video"/>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </section>
        <button onClick={() => setIsOpen(prev => ({...prev, customize: !prev.customize}))} className="flex gap-1 cursor-pointer bg-secondary/20 backdrop-blur-xl items-center text-sm p-1 px-2 rounded"><LuSlidersHorizontal />Customize</button>
        <button className="p-1 px-2 cursor-pointer bg-secondary/20 backdrop-blur-xl rounded text-xl"><MdOutlineFeedback/></button>
    </div>
}

export const LandingPage = () => {

    const { most_visited, recently_visited } = useSelector(state => state.sites)
    const theme = useSelector(state => state.theme)
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
                <div className="w-full flex items-center bg-tertiary rounded-md relative">
                    <section className="absolute z-10 top-11 left-0 min-w-1/2 max-w-full">
                        <SearchSuggestions query={query} onSelect={(item) => setQuery(item.query)}/>
                    </section>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the web using text or url..." className="w-full p-2 outline-none" />
                    <button className="p-2 cursor-pointer"><FaSearch/></button>
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