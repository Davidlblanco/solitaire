import React from 'react'

function Card({ cardValue, hidden, parentId, cardDragged }) {

    function drag(ev) {
        cardDragged(ev.target.childNodes[0].id)
    }
    const figure = {
        1: '♥️',
        2: '♠️',
        3: '♦️',
        4: '♣️',
    }
    function formatValue(val) {
        let split = val.split('-')
        switch (split[0]) {
            case '1':
                split[0] = 'A';
                break;

            case '11':
                split[0] = 'J';
                break;

            case '12':
                split[0] = 'Q';
                break;
            case '13':
                split[0] = 'K';
                break;

            default:
                break;
        }
        return split.join('-')
    }

    return (
        <div style={{ border: '1px solid' }} draggable={!hidden} onDragStart={drag}>
            {
                hidden ?
                    <div>{formatValue(cardValue) + ' hidden'}</div>
                    :
                    <div id={`col-${parentId}_card-${cardValue}`}>{formatValue(cardValue)}<span>{figure[cardValue.split('-')[1]]}</span></div>
            }
        </div>
    )
}

export default Card
