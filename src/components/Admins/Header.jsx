import { useSelector } from "react-redux"

export const Header = () => {

    const { picture } = useSelector(state => state.user)

    return <div className="h-16 w-screen fixed top-0 left-0 bg-white/10 backdrop-blur-sm flex items-center justify-between px-4 z-10">
        <div>
            <h2>ADMIN PANEL</h2>
        </div>
        <div>
            <img src={picture} alt="user profile" className="w-8 h-8 rounded-full"/>
        </div>
    </div>
}