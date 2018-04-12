import React, { Fragment } from 'react';
import logo from '../images/logo.png';
import './components.css';

const charImgURL = characterID => `http://image.eveonline.com/Character/${characterID}_64.jpg`

const Navbar = ({
    user,
    logOutUserAction,
    navToComparisonShopper,
    navToMarketBrowser,
    navToMarketManager,
    navToHangarManager,
    navToProductionManager
}) => {

    const avatar = characterID => {
        return (
            <div class='item right'>
                <img class='ui mini image' src={charImgURL(characterID)} alt='Avatar'/>
                {user.characterName}
            </div>            
        )
    };

    const logoutButton = () => {
        return (
            <div id='nav-button' class='item right'>
                <button class="ui button" onClick={logOutUserAction}>
                    Logout
                </button>
            </div>
        )
    }

    const crossLoginButton = currentAccessType => {

    }

    const rightMenuItems = () => {
        if (user.accessType) {
            return (
                <Fragment>
                    {avatar(user.characterID)}
                    {logoutButton()}
                    {crossLoginButton(user.accessType)}
                </Fragment>                
            )
        } else {
            
        }

        if (user.characterID) {
            return (
                <Fragment>
                    {avatar(user.characterID)}
                    {logoutButton()}
                </Fragment>
            )
        } else if (user.accessType && (user.accessType === 'read')) {
            return null;
        } else if (user.accessType && (user.accessType === 'write')) {
            return null;
        } else {
            return null;
        }
    };

    const middleMenuItems = () => {
        if (user.accessType && (user.accessType === 'write')) {
            return (
                <Fragment>
                    <div className='link item' onClick={navToHangarManager}>
                        Hangar<br/>Manager
                    </div>
                    <div className='link item' onClick={navToMarketManager}>
                        Market<br/>Manager
                    </div>
                    <div className='link item' onClick={navToProductionManager}>
                        Production<br/>Manager
                    </div>
                </Fragment>
            )
        } else {
            return null;
        }
    }

    return (
        <div className='ui top fixed inverted menu'>
            <div className='header item'>
                <img className='ui mini image' src={logo} alt='logo'/>
                EVE Outpost
            </div>
            <div className='link item' onClick={navToMarketBrowser}>
                Market<br/>Browser
            </div>
            <div className='link item' onClick={navToComparisonShopper}>
                Comparison<br/>Shopper
            </div>
            {middleMenuItems()}
            {rightMenuItems()}
        </div>
    )
};

export default Navbar;