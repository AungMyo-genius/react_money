import { useState, useEffect, useRef } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocument] = useState('')
    const [error, setError] = useState(null)

    // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect( () => {
        let ref = projectFirestore.collection(collection)

        if(query){
           ref = ref.where(...query)
        }

        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }

        const unsubscribe = ref.onSnapshot( snaphot => {
            const results = []
            snaphot.docs.forEach( doc => {
                results.push({...doc.data(), id:doc.id})
            })

            setDocument(results)
            setError(null)
        }, err => {
            console.log("could not fetch the data")
            setError(err.message)   
        })

        return () => unsubscribe()
    } , [collection, query, orderBy])


    return { documents, error}
}