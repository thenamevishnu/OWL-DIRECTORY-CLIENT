import { MdInfoOutline, MdOutlineBookmark, MdOutlineSettings } from "react-icons/md"
import { CgMenuRight } from "react-icons/cg";
import { useEffect, useState } from "react";
import { BsLightningCharge } from "react-icons/bs";

export const Header = ({ isMenuOpen, setIsMenuOpen }) => {

    const [battery, setBattery] = useState({is_charging: false, level: 0})

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

    return <div className="flex justify-between items-center w-full" >
        <MdInfoOutline size={20} className="cursor-pointer" />    
        <div className="flex items-center gap-5">
            <div className="font-secondary text-xs flex items-center gap-1">{battery.is_charging && <BsLightningCharge />} {battery.level}%</div>
            <CgMenuRight onClick={() => setIsMenuOpen(true)} size={20} className="cursor-pointer" />
        </div>
        <ul onClick={() => setIsMenuOpen(true)} className={`fixed flex flex-col gap-1 bg-black/20 backdrop-blur-sm overflow-hidden rounded right-1 top-1 ease-linear duration-200 ${isMenuOpen ? "w-[200px] p-2 py-1 h-20" : "h-0 w-0"}`}>
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded"><MdOutlineSettings /> Settings</li> 
            <li className="flex items-center w-full gap-2 p-1 cursor-pointer hover:bg-white/5 duration-300 rounded"><MdOutlineBookmark /> Saved Pages</li> 
        </ul>
    </div>
}