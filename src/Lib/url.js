export const is_url = (text) => {
    try {
        const res = new URL(text)
        const siteArr = res.hostname?.split(".")
        return {
            origin: res.origin,
            host_name: siteArr?.[siteArr.length - 2] || "Site"
        }
    } catch (error) {
        return false
    }
}