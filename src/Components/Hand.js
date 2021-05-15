import React, { useState } from 'react'
import Card from './Card'

function Hand({ hand }) {
    const [counter, setCounter] = useState(-1);


    function handleClick() {
        if (counter < hand.length - 1) {
            setCounter(counter + 1)
        }
        else {
            setCounter(- 1)
        }
    }
    // console.log(counter)
    // console.log(hand[counter])
    return (
        <div>
            <button onClick={handleClick} >giveCard</button>
            <div className='cardBox'>
                {hand.map((item, index) => {

                    return (index <= counter &&
                        <Card key={index} cardValue={item} />
                    )


                })}
            </div>
        </div >
    )
}

export default Hand
