import { User } from '@/types'
import {useState, useEffect, useMemo, useRef} from 'react'

export const useClients = (userId : number | undefined) :
    {
        clients : User[],
        loading : boolean,
        error : any
    } =>  {
    const [clients, setClients] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [id] = useState(userId)

    useEffect(() => {
        if(id === undefined) return
        const controller = new AbortController()
        const signal = controller.signal

         setLoading(true)
         console.log(`fetching clients for user.id : ${userId}` )
         fetch('/api/clients', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            signal
         })
         .then(response => {
            if (!response.ok) throw new Error(`Fetching client failed : ${response.status}`)
            return response.json()
         })
         .then(data => setClients(data))
         .catch(error => setError( new Error(error)))
         .finally(() => setLoading(false))

         return () => controller.abort()
    }, [id])

    return {clients, loading, error}
}

