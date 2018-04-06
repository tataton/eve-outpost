import React, { Fragment } from 'react';
import Backdrop from '../images/Backdrop.jpg';

const Welcome = () => {
    return (
        <Fragment>
            <div className='ui fluid image'>
                <img src={Backdrop}/>
                <div style={{position: 'absolute', bottom: 0, width: '100%', height: 'auto', color: 'white'}}>
                    TEST
                </div>
            </div>
            <div class='ui cards'>
                <div class='card'>
                    <div class='content'>
                        <div class='header'>Market Analyzer</div>
                        <div class='description'>
                            Browse items for sale on your local market. Or input a shopping list, and compare local prices to your favorite trade hub.
                        </div>
                    </div>
                    <div class='extra content' style={{fontStyle: 'italic'}}>
                        No login required
                    </div>
                    <div class='ui bottom attached button'>
                        Go to Market Analyzer
                    </div>
                </div>
                <div class='card'>
                </div>
            </div>
        </Fragment>
    )
};

export default Welcome;