import React from 'react'

function Card({ cardValue, hidden, parentId, cardDragged }) {

    function drag(ev) {
        cardDragged(ev.target.childNodes[0].id)
    }
    const figure = {
        4: '♣️',
        3: '♦️',
        2: '♠️',
        1: '♥️'
    }
    return (
        <div style={{ border: '1px solid' }} draggable={!hidden} onDragStart={drag}>
            {
                hidden ?
                    <div>{cardValue + ' hidden'}</div>
                    :
                    <div id={`col-${parentId}_card-${cardValue}`}>{cardValue}<span>{figure[cardValue.substring(2)]}</span></div>
            }
        </div>
    )
}

export default Card
