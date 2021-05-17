import React, { useState } from 'react'
import Card from './Card'
import '../Sass/Hand.scss'

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

    return (
        <div>
            <div className='cardBox'>
                <div onClick={handleClick} className='closedBox'>
                    {hand.map((item, index) => {
                        return (index >= counter &&
                            <Card key={index} cardValue={item} hidden={true} indexHand={index - counter} />
                        )
                    })}
                </div>
                <div className='openedBox'>
                    {hand.map((item, index) => {
                        return (index <= counter &&
                            <Card key={index} cardValue={item} indexHand={index} />
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default Hand
