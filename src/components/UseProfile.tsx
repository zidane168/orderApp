import { IMember } from "@/app/api/members"
import { memberApi } from "@/app/api/members/member.api"
import { useEffect, useState } from "react"

export function useProfile() {
    const [ data, setData ] = useState<IMember>()
    const [ loading, setLoading ] = useState(true)
    
    useEffect(() => {
        setLoading(true)   

        const fetchData = async () => { 
            const { getProfile } = memberApi()
            const res = await getProfile() 

            if (res.data.status == 200) {
                setData(res.data.params);
                setLoading(false)
            }
        } 

        fetchData();

    }, [])

    return { loading, data }
}