import { useState, useEffect } from "react";

//custom hooks for fetching data
function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            }
            catch (error) {
                setError(error)
            }
            finally {
                setloading(false)
            }
        }
        fetchData();
    }, [url])

    return { data, error, loading }
}

export default useFetch;