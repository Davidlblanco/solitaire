import React from 'react'
import Card from './Card'
// import '../Sass/FinalCol'

function FinalCol({ final }) {
    // console.log(final)
    return (
        final.length > 0 ?
            <Card cardValue={final[final.length - 1]} ></Card>
            : <div></div>
    )
}

export default FinalCol
