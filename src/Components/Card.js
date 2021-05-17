import React from 'react'
import '../Sass/Card.scss'

function Card({ cardValue, hidden, parentId, cardDragged, indexHand, openCut, final, setFinal }) {

    function drag(ev) {
        cardDragged(ev.target.childNodes[0].id)
    }
    function handDrag(ev) {
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
        return split[0]
    }

    function handleDoubleClick({ target }) {
        const index = parseInt(target.id.split('-')[3] === '1' ? target.id.split('-')[3] : target.id.split('-')[3] - 1);
        // const index = parseInt(target.id.split('-')[3] - 1);

        // console.log(target.id.split('-')[3])
        // const respectiveFinal = final[index];
        setFinal(cardValue, parentId, target.id.split('-')[3])

        // if (parseInt(target.id.split('-')[2]) - 1 === respectiveFinal.length) {
        //     setFinal(cardValue, parentId, target.id.split('-')[3])
        // }
    }

    return (
        <div
            style={{ margin: `${indexHand}px 0 0 ${indexHand}px` }}
            draggable={!hidden}
            onDragStart={parentId !== 'hand' ? drag : handDrag}
            className={`card ${hidden && `cut hidden`} ${openCut && `cut`} ${formatValue(cardValue) == '14' && 'invisible'}`}>
            {
                hidden ?
                    <div>
                        {formatValue(cardValue) + ' hidden'}
                        {/* <span>{figure[cardValue.split('-')[1]]}</span> */}
                    </div>
                    :
                    <div
                        onDoubleClick={handleDoubleClick}
                        id={`col-${parentId}_card-${cardValue}`}
                        style={{ display: 'block', height: '150px' }}>
                        {formatValue(cardValue)}
                        <span>{figure[cardValue.split('-')[1]]}</span>
                    </div>
            }
        </div>
    )
}

export default Card
