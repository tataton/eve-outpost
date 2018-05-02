import React, { Fragment } from 'react';
import StationSelectContainer from '../containers/StationSelectContainer';
import { oauthLogin } from '../services/oauth';
import logo from '../images/logo.png';
import './components.css';
import { 
    marketBrowserAddress, 
    comparisonShopperAddress, 
    marketManagerAddress, 
    hangarManagerAddress, 
    productionManagerAddress
} from '../navigation';

const charImgURL = characterID => `http://image.eveonline.com/Character/${characterID}_64.jpg`

const Navbar = ({
    user,
    router,
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

    const emptyMenuItem = () => (<div className='item right'></div>)

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

    const linkStyle = targetPath => ('link item' + ((router.location.pathname === targetPath) ? ' active' : ''));

    const middleMenuItems = () => {
        if (user.accessType && (user.accessType === 'write')) {
            return (
                <Fragment>
                    <div className={linkStyle(hangarManagerAddress)} onClick={navToHangarManager}>
                        Hangar<br/>Manager
                    </div>
                    <div className={linkStyle(marketManagerAddress)} onClick={navToMarketManager}>
                        Market<br/>Manager
                    </div>
                    <div className={linkStyle(productionManagerAddress)} onClick={navToProductionManager}>
                        Production<br/>Manager
                    </div>
                </Fragment>
            )
        } else {
            return null;
        }
    }

    const secondMenu = () => (router.location.pathname !== '/') ?
                                (<StationSelectContainer />) :
                                null;

    return (
        <Fragment>
            <div className='ui top fixed inverted menu firstmenu'>
                <div className='header item'>
                    <img className='ui mini image' src={logo} alt='logo'/>
                    EVE Outpost
                </div>
                <div className={linkStyle(marketBrowserAddress)} onClick={navToMarketBrowser}>
                    Market<br/>Browser
                </div>
                <div className={linkStyle(comparisonShopperAddress)} onClick={navToComparisonShopper}>
                    Comparison<br/>Shopper
                </div>
                {middleMenuItems()}
                {rightMenuItems()}
            </div>
            {secondMenu()}
        </Fragment>
    )
};

export default Navbar;