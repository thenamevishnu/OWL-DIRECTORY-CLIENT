import toast from "react-hot-toast"

export const toaster = {
    error: (message) => {
        return toast(message, {
            icon: "❌",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#ccc"
            }
        })
    },
    success: (message) => {
        return toast(message, {
            icon: "✅",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#ccc"
            }
        })
    }
}