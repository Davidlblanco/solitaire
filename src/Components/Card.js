import React from 'react'

function Card({ cardValue, hidden }) {
    return (
        <div style={{ border: '1px solid' }}>
            {
                hidden ?
                    <div>{cardValue + ' hidden'}</div>
                    :
                    <div>{cardValue}</div>
            }
        </div>
    )
}

export default Card
