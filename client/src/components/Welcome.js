import React from 'react';
import loginButton from '../images/loginButton.png';
import { oauthLogin } from '../services/oauth';
import './components.css';

const Welcome = () => {
    return (
        <div className='ui background'>
            <div className='ui center aligned container img-overlay'>
                <div className='img-overlay-title'>
                    EVE Outpost
                </div>
                <div className='img-overlay-description'>
                    A market and manufacturing manager for EVE Online. Choose an access level:
                </div>
                <div className='ui centered cards'>
                    <div className='card'>
                        <div className='content card-panel-read'>
                            <div className='header card-title'>Browser</div>                        
                        </div>
                        <div className='content card-feature-list'>
                            <div className='header'>Market Browser<br/>Comparison Shopper</div>
                        </div>
                        <div className='content'>
                            <div className='description card-description'>
                                Browse items for sale on your local market. Or input a shopping list, and compare local prices to your favorite trade hub.
                            </div>
                        </div>
                        <div id='button-area-1' className='extra content'>
                            <button className='ui button'>
                                <span style={{fontSize: '1.2rem'}}>Browse NPC Markets</span><br/>
                                <p style={{fontStyle: 'italic', marginTop: '0', fontWeight: 'normal'}}>(without logging in)</p>
                            </button>
                            <div className='ui horizontal divider'>
                                Or
                            </div>
                            <button className='ui button login-button' onClick={oauthLogin('read')}>
                                <img className='ui small rounded image' src={loginButton} alt='Log in to Hangar Manager'/>
                            </button>
                        </div>
                        <div id='footer-area-1' className='extra content'>                            
                            <div className='ui button-explanation'>
                                Requests API access for inspecting player-owned structure markets. Logging in also saves your most recently visited market locations and loads them each time you visit.
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='content card-panel-write'>
                            <div className='header card-title'>Manager</div>                        
                        </div>
                        <div className='content card-feature-list'>
                            <div className='header'>Market Manager<br/>Hangar Manager<br/>Production Manager</div>
                        </div>
                        <div className='content'>                            
                            <div className='description card-description'>
                                Set target inventories, market orders and production capacities in multiple locations, and receive notifications when stocks run low.
                            </div>
                            <br/>
                            <div className='meta' style={{fontStyle: 'italic'}}>
                                (Work in progress)
                            </div>
                        </div>
                        <div id='button-area-2' className='extra content'>
                            <button className='ui button disabled login-button'>
                                <img className='ui small rounded image' src={loginButton} alt='Log in to Hangar Manager'/>
                            </button>
                        </div>
                        <div id='footer-area-2' className='extra content'>  
                            <div className='ui button-explanation'>
                                Requests API access for markets, assets, and industry. (Access is read-only; no in-game information is changed.) 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Welcome;