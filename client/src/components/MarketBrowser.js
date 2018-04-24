import React from 'react';
import './components.css';
import StationFinderContainer from '../containers/StationFinderContainer';

const MarketBrowser = () => {
    return (
        <div className='ui background'>
            <div className='ui center aligned container img-overlay'>
                <div className='img-overlay-title'>
                    Market Browser
                </div>
                <StationFinderContainer />
            </div>
        </div>
    )
};

export default MarketBrowser;