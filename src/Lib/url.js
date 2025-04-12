export const is_url = (text) => {
    try {
        const res = new URL(text)
        return {
            origin: res.origin,
            host_name: res.hostname?.split(".")?.[0] || res.hostname
        }
    } catch (error) {
        return false
    }
}