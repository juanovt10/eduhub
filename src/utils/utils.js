import { axiosReq } from "../api/axiosDefaults"

export const fetchMoreData = async (resource, setResources, onStartLoading, onFinishedLoading) => {
    onStartLoading();
    try {
        const { data } = await axiosReq.get(resource.next);
        setResources(prevResource => ({
            ...prevResource,
            next:data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some(accResult => accResult.id === cur.id)
                ? acc
                : [...acc, cur];
            }, prevResource.results)
        }))
    } catch (error) {
        console.log(error)
    } finally {
        onFinishedLoading();
    }
}