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

    /**
     * Will return an appropriately styled JSX button that logs character
     * in via the appropriate OAuth path.
     * @param {String} targetAccessType
     * @returns {JSX.Element} button
     */
    const loginButton = targetAccessType => {
        return null;
    }

    /**
     * Will return a JSX button that will sequentially log character
     * out and then log them in via the other accessType.
     * @param {String} currentAccessType User's current accessType
     * @returns {JSX.Element} button
     */
    const crossLoginButton = currentAccessType => {
        return null;
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
            return (
                <Fragment>
                    {loginButton('read')}
                    {loginButton('write')}
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