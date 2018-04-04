import React, { Fragment } from 'react';
import Backdrop from '../images/Backdrop.jpg';

const Welcome = () => {
    return (
        <Fragment>
            <div className="ui fluid image">
                <img src={Backdrop}/>
                <div style={{position: 'absolute', bottom: 0, width: '100%', height: 'auto', color: 'white'}}>
                    TEST
                </div>
            </div>
        </Fragment>
    )
};

export default Welcome;