import React from 'react';
import { oauthLogin, oauthLogoutAddress } from '../services/oauth';
import loginButton from '../images/loginButton.png';
import logo from '../images/logo.png';

const charImgURL = characterID => `http://image.eveonline.com/Character/${characterID}_64.jpg`

const Navbar = ({ user, navToHubCompare }) => {

    const rightMenuItems = () => {
        if (!user.characterID) {
            return (
                null
/*                
                <Menu.Item position='right'>
                    <Button onClick={oauthLogin}>
                        <Image
                            src={loginButton}
                            size='small'
                        />
                    </Button>
                </Menu.Item>
*/                
            )
        } else {
            return (
                <div class='item right'>
                    <img class='ui mini image' src={charImgURL(user.characterID)} style={{ marginRight: '1.5em' }}/>
                    {user.characterName}
                </div>
            )
        }
    };

    return (
/*
        <Menu fixed='top' inverted>
            <Menu.Item header>
                <Image 
                    size='mini'
                    src={logo}
                    style={{ marginRight: '1.5em' }}
                />
                EVE Outpost
            </Menu.Item>
            <Menu.Item onClick={navToHubCompare}>Hub Comparison</Menu.Item>
            {rightMenuItems()}
        </Menu>
*/
        <div class="ui fixed inverted menu">
            <div class="item header">
                <img class='ui mini image' src={logo} style={{ marginRight: '1.5em' }}/>
                EVE Outpost
            </div>
        </div>
    )

};

export default Navbar;