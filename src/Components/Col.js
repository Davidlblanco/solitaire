import React from 'react'
import Card from './Card'

function Col({ closed, opened }) {
    return (
        <div>
            {closed && closed.map((item, index) => {
                return (<Card key={index} cardValue={item} hidden={true} />)
            })}
            {opened &&
                opened.map((item, index) => {
                    return (<Card key={index} cardValue={item} hidden={false} />)
                })
            }
        </div>
    )
}

export default Col
