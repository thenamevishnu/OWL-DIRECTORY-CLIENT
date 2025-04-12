import { useEffect, useMemo, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { GrNext, GrPrevious } from "react-icons/gr";
import { ResultPreview } from "../components/ResultPreview";
import { useLocation, useNavigate } from "react-router";
import { toaster } from "../Lib/alert";
import { api } from "../axios";
import { Loading } from "../components/Loading";
import { SearchSuggestions } from "../components/SearchSuggestions";

const limit = 20

export const SearchResults = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const [query, setQuery] = useState(queryParams.get("q") || "")
    const [results, setResults] = useState({ results: [], total_results: 0, is_previous_available: false, is_next_available: false })
    const [isLoading, setLoading] = useState(false)
    const currentPage = useMemo(() => queryParams.get("page") ? isNaN(queryParams.get("page")) ? 1 : parseInt(queryParams.get("page")) : 1, [queryParams])
    const redirect = useNavigate()

    const handleSearch = async () => {
        setLoading(true)
        try {
            const { data } = await api.get("/url/search", {
                params: {
                    q: query,
                    page: currentPage,
                    limit: parseInt(limit)
                }
            })
            setResults(data)
            setLoading(false)
        } catch (err) {
            return toaster.error(err.response?.data.message || "Error while getting search results. Please try again.")
        }
    }

    useEffect(() => {
        handleSearch()
    }, [currentPage, queryParams.get("q")])

    return <div className="flex justify-center p-2 md:p-5">
        <div className="w-full grid grid-cols-12 justify-center max-w-[1400px]">
            <div className="col-span-12 sm:col-span-11 md:col-span-10 lg:col-span-9 xl:col-span-8 2xl:col-span-7">
                <div>
                    <form className="w-full" onSubmit={(e) => { e.preventDefault(); redirect(`/search?q=${encodeURI(query)}&page=1`) }}>
                        <div className="w-full relative flex items-center bg-tertiary rounded-md">
                            <section className="absolute top-10.5 left-0 min-w-1/2 max-w-full">
                                <SearchSuggestions results={results} query={query} onSelect={(item) => setQuery(item.query)}/>
                            </section>
                            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the web using text or url..." className="w-full p-2 outline-none" />
                            <button className="p-2 text-dim cursor-pointer"><FaSearch /></button>
                        </div>
                    </form>
                </div>
                <div className="my-1">
                    <p>Total Resuls: {results?.total_results}</p>
                </div>
                <div className="flex flex-col gap-2">
                    {
                        isLoading && <div className="flex justify-center mt-4"><Loading /></div>
                    }
                    {
                        !isLoading && results?.results.length === 0 && <div className="text-center">No results found!</div>
                    }
                    {
                        !isLoading && results?.results.map((result) => {
                            return <ResultPreview result={result} key={result._id} />
                        })
                    }
                </div>
                {
                    <div className="flex justify-center gap-3 mt-4">
                        {!isLoading && results?.is_previous_available && <button onClick={() => redirect(`/search?q=${query}&page=${currentPage - 1}`)} className="p-2 bg-secondary px-4 cursor-pointer rounded font-bold"><GrPrevious /></button>}
                        {!isLoading && results?.is_next_available && <button onClick={() => redirect(`/search?q=${query}&page=${currentPage + 1}`)} className="p-2 bg-secondary px-4 cursor-pointer rounded font-bold"><GrNext /></button>}
                    </div>
                }
            </div>
        </div>
    </div>
}
