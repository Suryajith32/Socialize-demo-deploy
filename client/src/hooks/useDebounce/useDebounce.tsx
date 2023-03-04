import { useEffect, useState } from "react"

const useDebounce = (value: string, delay: number) => {
    const [debounceValue, setDebounceValue] = useState<any>()

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay || 500);
        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);
    return debounceValue;
}
export default useDebounce