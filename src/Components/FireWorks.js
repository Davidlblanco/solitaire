import React from 'react'
import win from '../Assets/win.png'

function FireWorks() {
    return (
        <div>
            <div class="pyro">
                <div class="before"></div>
                <div class="after"></div>
            </div>
            <div className='pulse'>
                <img src={win} alt='win image' />
                <h1>You Win!</h1>
            </div>
        </div>
    )
}

export default FireWorks
