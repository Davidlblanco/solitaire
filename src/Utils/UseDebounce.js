import { useRef } from "react"

export default function UseDebounce(func, delay) {
    //variable to store setTimeOut reference (id of timeout)
    const timeOutRef = useRef(null);

    function ddebounceFn(...args) {
        // clearing timeout 
        window.clearTimeout(timeOutRef.current)
        // asigningreference from the first variable
        timeOutRef.current =
            window.setTimeout(() => {
                func(...args)

            }, delay)
    }
    return ddebounceFn
}
