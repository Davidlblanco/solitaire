import React, { useState } from 'react'
import Card from './Card'

function Col({ closed, opened, id, handleColMove }) {

    const [moveCol, setMoveCol] = useState({})
    const [moveCard, setMoveCard] = useState({})

    function handleCardDragged(cardLeave, cardLand) {
        console.log(cardLeave, cardLand)
    }

    function handleOver(e) {
        e.stopPropagation();
        // console.log('leave', id)
        setMoveCol({ landingCol: id })
    }

    function dragEnd() {
        // console.log({ ...moveCol, ...moveCard })
        // console.log(moveCard)
        // console.log('end')
    }

    // console.log({ ...moveCard, ...moveCol })
    return (
        <div id={id} draggable={true}>
            {closed && closed.map((item, index) => {
                return (<Card key={index} cardValue={item} hidden={true} />)
            })}
            {opened &&
                opened.map((item, index) => {
                    return (<Card parentId={id} key={index} cardValue={item} hidden={false} cardDragged={handleCardDragged} />)
                })
            }
        </div>
    )
}

export default Col
