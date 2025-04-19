import { Fragment, useEffect, useState } from "react"
import { Header } from "../../components/Admins/Header"
import { api } from "../../axios"
import { toaster } from "../../Lib/alert"

export const AdminDashboard = () => {

    const [stat, setStat] = useState({
        total_users: 0,
        total_websites: 0,
        total_searches: 0,
        deleted_websites: 0,
        live_websites: 0,
        blocked_websites: 0
    })

    const getStat = async () => {
        try {
            const { data, status } = await api.get("/admin/stat")
            if (status !== 200) return toaster.error(data.message)
            setStat({...data.stat})
        } catch (err) {
            return toaster.error(err.response?.data.message || "Error while fetching stat. Please try again.")
        }
    }

    useEffect(() => {
        getStat()
    }, [])

    return <Fragment>
        <Header />
        <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2 px-2">
            {
                Object.keys(stat).map(item => ({key: item, label: item.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())})).map((item, index) => {
                    return <div className="bg-white/10 text-center backdrop-blur-sm rounded p-4">
                        <h1>{item.label}</h1>
                        <p className="text-2xl font-semibold">{stat[item.key]}</p>
                    </div>
                })
            }
        </div>
    </Fragment>
}