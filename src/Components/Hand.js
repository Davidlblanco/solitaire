import React, { useEffect, useState } from 'react'
import Card from './Card'
// import '../Sass/Hand.scss'

function Hand({ hand, handleHandMove, final, setFinal }) {
    const [counter, setCounter] = useState(-1);

    function handleCardDragged(cardInfo) {
        handleHandMove({ card: cardInfo })
    }

    function handleClick() {
        if (counter < hand.length - 1) {
            setCounter(counter + 1)
        }
        else {
            setCounter(- 1)
        }
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        handleHandMove({ col: ev.target.id })
    }

    useEffect(() => {
        if (counter > 1)
            setCounter(counter - 1)
    }, [hand]);

    return (
        <div>
            <div className='cardBox'>
                <div onClick={handleClick} className='closedBox'>
                    {hand.map((item, index) => {
                        return (index >= counter + 1 ?
                            <Card parentId={'hand'} key={index} cardValue={item} hidden={true} indexHand={index !== 0 && index - counter} />
                            :
                            <Card parentId={'hand'} key={index} cardValue={'none'} hidden={true} />
                        )
                    })}
                </div>
                <div className='openedBox' onDrop={drop} onDragOver={allowDrop}>
                    {hand.map((item, index) => {
                        return (index <= counter &&
                            <Card parentId={'hand'} key={index} cardValue={item} indexHand={index} cardDragged={handleCardDragged} final={final} setFinal={setFinal} />
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default Hand
