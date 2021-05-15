import React, { useState } from 'react'

function Card({ cardValue, hidden, parentId, cardDragged }) {

    const [leave, setLeave] = useState(-1)
    const [land, setLand] = useState(-1)

    function handleLeave(e) {
        setLeave(e.target.id)
        if (land > -1) {
            console.log('leave')
            cardDragged(leave, land)
        }
    }
    function handleLand(val) {
        setLand(parentId)
        if (land > -1) {
            console.log('land')
            cardDragged(leave, land)
        }

    }



    return (
        <div style={{ border: '1px solid' }} draggable='false'>
            {
                hidden ?
                    <div>{cardValue + ' hidden'}</div>
                    :
                    <div
                        onDragStart={handleLeave}
                        draggable={!hidden}
                        id={`${parentId}-card-${cardValue}`}
                        onDragLeave={({ target }) => handleLand(target.id)}
                    >{cardValue}</div>
            }
        </div>
    )
}

export default Card
