export async function ping(url) {
    try {
        const response = await fetch(url)
        return response.status === 200
    } catch(exception) {
        return false
    }
}