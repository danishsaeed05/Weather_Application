import React from 'react'
import '../Styles/Marker.css';

function Marker({ color, name, id }) {
    return (
        <div>

            <div className="pin bounce"
                style={{ backgroundColor: color, cursor: 'pointer' }}
            />
            
            <div className="pulse" />
        </div>
    )
}

export default Marker
