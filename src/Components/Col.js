import React from 'react'
import Card from './Card'

function Col({ closed, opened, id, handleColMove }) {

    function handleCardDragged(cardInfo) {
        handleColMove({ card: cardInfo })
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        handleColMove({ col: ev.target.id })
    }

    return (
        <div id={id} draggable={true} onDrop={drop} onDragOver={allowDrop}>
            {closed && closed.map((item, index) => {
                return (<Card key={index} cardValue={item} hidden={true} draggable={false} />)
            })}
            {opened &&
                opened.map((item, index) => {
                    return (<Card parentId={id} key={index} id={item} cardValue={item} hidden={false} cardDragged={handleCardDragged} />)
                })
            }
        </div>
    )
}

export default Col
