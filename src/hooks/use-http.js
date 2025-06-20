import { useCallback, useState } from "react"

const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, method = "GET", body = null, headers = { "Context-Type": "application-json" }) => {
        setLoading(true)
        try {

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }

            const data = response.json()
            setLoading(false)
            return await data
        } catch (error) {
            // setLoading(false)
            setError(error.message)
            throw error
        }
    }, [])

    const clearError = useCallback(() => setError(false), [])

    return { request, loading, error, clearError }
}

export default useHttp