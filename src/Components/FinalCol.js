import React from 'react'
import Card from './Card'

function FinalCol({ final }) {
    return (
        final.length > 0 ?
            <Card cardValue={final[final.length - 1]} ></Card>
            : <div></div>
    )
}

export default FinalCol
