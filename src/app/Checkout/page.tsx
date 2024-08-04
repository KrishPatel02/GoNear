import React, { useEffect } from 'react'

const page = () => {
    useEffect(() => {
        window.location.href = "/"
    }, [])
    return (
        <div>
            Please Select a Product
        </div>
    )
}

export default page
