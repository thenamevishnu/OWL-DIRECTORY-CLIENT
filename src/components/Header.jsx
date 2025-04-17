import { MdAdsClick, MdInfoOutline, MdOutlineLogin } from "react-icons/md"
import { CgMenuRight } from "react-icons/cg";
import { useEffect, useState } from "react";
import { BsLightningCharge } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { toaster } from "../Lib/alert";
import axios from "axios";
import { clearUser, setUser } from "../Redux/slices/user.slice";
import { useLocation, useNavigate } from "react-router";
import { BsGlobeAmericas } from "react-icons/bs";
import { api } from "../axios";
import { FaStar } from "react-icons/fa";
import { clearMostVisited, clearRecentlyVisited } from "../Redux/slices/sites.slice";
import { cookie } from "../Lib/cookie";

export const Header = ({ isMenuOpen, setIsMenuOpen, setIsOpen, isOpen }) => {

    const { pathname } = useLocation()
    const { email, name, picture } = useSelector(state => state.user)
    const [battery, setBattery] = useState({ is_charging: false, level: 0 })
    const dispatch = useDispatch()
    const redirect = useNavigate()

    useEffect(() => {
        (async () => {
            const battery = await navigator.getBattery()
            setBattery({is_charging: battery.charging, level: (battery.level * 100).toFixed(0)})
            battery.addEventListener("chargingchange", function (e) {
                setBattery(b => ({...b, is_charging: e.target.charging}))
            });
        
            battery.addEventListener("levelchange", function (e) {
                setBattery(b => ({...b, level: (e.target.level * 100).toFixed(0)}))
            });
            return () => {
                battery.removeEventListener("chargingchange", function(e) {
                    setBattery(b => ({...b, is_charging: e.target.charging}))
                });
            
                battery.removeEventListener("levelchange", function(e) {
                    setBattery(b => ({...b, level: (e.target.level * 100).toFixed(0)}))
                });
            }
        })()
    }, [])

    const handleLogin = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            try {
                const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const { data: res, status } = await api.post("/auth", { email: data.email, picture: data.picture, name: data.name })
                if(status !== 200) return toaster.error(res.message)
                dispatch(setUser({ ...data, meta_code: res.meta_code }))
                cookie.set(res.token)
            } catch (error) {
                return toaster.error(error.response?.data.message)
            }
        },
        onError: (_error) => {
            return toaster.error("Error while logging in. Please try again.")
        }
    })

    const handleLogout = () => {
        const res = confirm("Are you sure you want to logout?")
        if (!res) return;
        googleLogout()
        return dispatch(clearUser())
    }

    const handleClear = (type) => {
        const res = confirm("Are you sure you want to clear?")
        if (!res) return;
        if (type == "most") {
            dispatch(clearMostVisited())
        }
        if(type == "recent") {
            dispatch(clearRecentlyVisited())
        }
    }

    return <div className="flex justify-between items-center w-full" >
        <div className="relative group">
            <MdInfoOutline size={20} className="cursor-pointer" onClick={() => setIsOpen(isOpen => ({...isOpen, info: !isOpen.info}))} />
            <div className={`fixed duration-300  overflow-hidden top-6 left-6 max-w-[400px] ${isOpen.info ? "w-full h-96 pe-12" : "h-0 w-0"} z-[10]`}>
                <div className="bg-secondary/20 backdrop-blur-xl rounded p-2 text-xs"><p><span className="font-bold">Owl Directory</span> is a free web app that lets you list and showcase your websites with ease. Whether you're a developer, business owner, or blogger, you can add your site to our growing directory and reach a wider audience—all at no cost. Simple, fast, and open to everyone!</p></div>
            </div>
        </div>   
        <div className="flex items-center gap-5">
            <div className="font-secondary text-xs flex items-center gap-1">{battery.is_charging && <BsLightningCharge />} {battery.level}%</div>
            <CgMenuRight onClick={() => setIsMenuOpen(true)} size={20} className="cursor-pointer" />
        </div>
        <ul onClick={() => setIsMenuOpen(true)} className={`fixed flex z-1 text-nowrap justify-center flex-col gap-1 bg-[#333]/20 backdrop-blur-xl overflow-hidden rounded right-1 top-1 ease-linear duration-200 ${isMenuOpen ? "w-[200px] p-2" : "w-0 py-2 px-0"}`}>
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded">
                {
                    email ? <div onClick={handleLogout} className="flex items-center gap-2 w-full">
                        <img src={picture} alt={name} className="w-4 h-4 rounded-full" />
                        <div>{name}</div>
                    </div> : <div onClick={handleLogin} className="flex items-center gap-2 w-full">
                        <MdOutlineLogin className="cursor-pointer" />
                        Login    
                    </div>
                }
            </li> 
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded" onClick={() => redirect("/website/add", { state: pathname })}><BsGlobeAmericas /> Add Website</li>
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded" onClick={() => handleClear("most")}><FaStar /> Clear Most Visited</li>
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded" onClick={() => handleClear("recent")}><MdAdsClick /> Clear Recently</li>
        </ul>
    </div>
}