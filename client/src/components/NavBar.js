import React, { Fragment } from 'react';
import { oauthLogin } from '../services/oauth';
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
            <div className='item right'>
                <img className='ui mini image' src={charImgURL(characterID)} alt='Avatar'/>
                {user.characterName}
            </div>            
        )
    };

    const emptyMenuItem = () => {
        return (
            <div className='item right'>
            </div>            
        )
    }

    const logoutButton = () => {
        return (
            <div className='item right nav-button'>
                <button className="ui button" onClick={logOutUserAction}>
                    Logout
                </button>
            </div>
        )
    }

    /**
     * Will return an appropriately styled JSX button that logs character
     * in via the appropriate OAuth path.
     * @param {Boolean} isLoggedIn
     * @param {String} targetAccessType
     * @returns {JSX.Element} button
     */
    const loginButton = (isLoggedIn, targetAccessType) => {
        const logOutAndIn = () => {
            logOutUserAction();
            oauthLogin(targetAccessType);
        }
        const buttonText = (targetAccessType === 'read') ? 'Browser' : 'Manager';
        const buttonClass = (targetAccessType === 'read') ? 'ui green button' : 'ui blue button';
        const clickFunction = isLoggedIn ? logOutAndIn : oauthLogin(targetAccessType);
        return (
            <div className='item right nav-button'>
                <button className={buttonClass} onClick={clickFunction}>
                    Log In as<br/>{buttonText}
                </button>
            </div>
        );
    }

    const rightMenuItems = () => {
        if (user.accessType) {
            const oppositeAccess = (user.accessType === 'read') ? 'write' : 'read';
            return (
                <Fragment>
                    {avatar(user.characterID)}
                    {logoutButton()}
                    {loginButton(true, oppositeAccess)}
                </Fragment>                
            )
        } else {
            return (
                <Fragment>
                    {emptyMenuItem()}
                    {loginButton(false, 'read')}
                    {loginButton(false, 'write')}
                </Fragment>
            )
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