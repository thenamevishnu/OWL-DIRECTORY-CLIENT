import { MdAdsClick, MdHistory, MdInfoOutline, MdOutlineBookmark, MdOutlineLogin, MdOutlineSettings } from "react-icons/md"
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

export const Header = ({ isMenuOpen, setIsMenuOpen }) => {

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
                dispatch(setUser({ ...data }))
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
        <MdInfoOutline size={20} className="cursor-pointer" />    
        <div className="flex items-center gap-5">
            <div className="font-secondary text-xs flex items-center gap-1">{battery.is_charging && <BsLightningCharge />} {battery.level}%</div>
            <CgMenuRight onClick={() => setIsMenuOpen(true)} size={20} className="cursor-pointer" />
        </div>
        <ul onClick={() => setIsMenuOpen(true)} className={`fixed flex z-1 text-nowrap justify-center flex-col gap-1 bg-[#333]/20 backdrop-blur-sm overflow-hidden rounded right-1 top-1 ease-linear duration-200 ${isMenuOpen ? "w-[200px] p-2" : "w-0 py-2 px-0"}`}>
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
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded"><MdOutlineSettings /> Settings</li> 
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded"><MdOutlineBookmark /> Saved Pages</li> 
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded" onClick={() => redirect("/website/add", { state: pathname })}><BsGlobeAmericas /> Add Website</li>
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded" onClick={() => handleClear("most")}><FaStar /> Clear Most Visited</li>
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded" onClick={() => handleClear("recent")}><MdAdsClick /> Clear Recently</li>
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded" onClick={() => handleClear("recent")}><MdHistory /> History</li>
        </ul>
    </div>
}