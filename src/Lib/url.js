import axios from "axios"

export const getUrlComponent = async (url) => {
    try {
        const { data: res } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        })

        const dom = new DOMParser()
        const doc = dom.parseFromString(res, "text/html")

        const title = doc.querySelector("title")?.innerText || "website"
        const description = doc.querySelector("meta[name='description']")?.content || ""
        const icons = Array.from(doc.querySelectorAll("link[rel*='icon']")).map((icon) => icon.href)

        return { title, description, icon: icons?.[0] || "" }
    } catch (error) {
        console.log(error);
        return {
            err: "Error fetching website. Please try again."
        }
    }
}

export const is_url = (text) => {
    try {
        const res = new URL(text)
        return res.origin
    } catch (error) {
        return false
    }
}