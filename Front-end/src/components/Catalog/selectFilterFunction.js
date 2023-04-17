export default function selectFilter (filterArray, setFilterArray, filterId, setStatus) {
    if (!filterArray.includes(filterId)) {
        let newArray = [...filterArray, filterId]
        setFilterArray(newArray)
        setStatus([])
    }

    if (filterArray.includes(filterId)) {
        let newArray = filterArray.filter(id => id !== filterId)
        setFilterArray(newArray)
        setStatus([])
    }
}