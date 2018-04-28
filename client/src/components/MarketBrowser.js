import React, { Fragment } from 'react';
import './components.css';
import SelectedStationContainer from '../containers/SelectedStationContainer';
import StationSelect from '../components/StationSelect';

const MarketBrowser = () => {
    return (
        <Fragment>
            <SelectedStationContainer />
            <StationSelect />
            <div className='ui background'>
                <div className='ui center aligned container img-overlay'>
                    <div className='img-overlay-title'>
                        Market Browser
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default MarketBrowser;