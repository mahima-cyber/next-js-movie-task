import CreateMovie from '@/component/create-movie'
import React from 'react'
import { useRouter } from 'next/router';


const createUpdateMovie = () => {
    const router = useRouter();
    const { id } = router.query; // Get the ID from URL parameters
    return (
        <div>
            <CreateMovie id={id} />
        </div>
    )
}
export default createUpdateMovie
