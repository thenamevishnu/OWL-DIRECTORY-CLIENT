import { useEffect, useState } from "react"
import { api } from "../axios"

export const SearchSuggestions = ({query, onSelect, results}) => {
    
    const [suggestions, setSuggestions] = useState([])

    const getSuggestion = async () => {
        try {
            const { data, status } = await api.get("/url/suggestions", {
                params: {
                    q: query
                }
            })
            if(status === 200) {
                return setSuggestions(data)
            }
            setSuggestions([])
        } catch (err) {
            setSuggestions([])   
        }
    }

    useEffect(() => {
        setSuggestions([])
    }, [results])

    useEffect(() => {
        if (query?.trim()?.length > 0) {
            getSuggestion()
        } else {
            setSuggestions([])
        }
    }, [query])

    return <div className={`w-full backdrop-blur-sm bg-secondary/10 transition-all max-h-48 overflow-y-scroll scroll-bar px-1 ${suggestions.length > 0 ? "py-1" : "p-0"} rounded`}>
        {
            suggestions.map(suggestion => {
                return <p onClick={() => { setSuggestions([]); onSelect(suggestion);}} className="cursor-pointer hover:bg-tertiary/40 p-1 rounded" key={suggestion._id}>{suggestion.query}</p>
            })
        }
    </div>
}