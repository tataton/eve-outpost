import React from 'react';
import { Menu, Image, Button } from 'semantic-ui-react';
import { oauthLogin, oauthLogoutAddress } from '../services/oauth';
import loginButton from '../images/loginButton.png';
import logo from '../images/logo.png';

const charImgURL = characterID => `http://image.eveonline.com/Character/${characterID}_64.jpg`

const Navbar = ({ user, navToHubCompare }) => {

    const rightMenuItems = () => {
        if (!user.characterID) {
            return (
                <Menu.Item position='right'>
                    <Button onClick={oauthLogin}>
                        <Image
                            src={loginButton}
                            size='small'
                        />
                    </Button>
                </Menu.Item>
            )
        } else {
            return (
                <Menu.Item position='right'>
                    <Image 
                        src={charImgURL(user.characterID)}
                        size='mini'
                        style={{ marginRight: '1.5em' }}
                    />
                    {user.characterName}
                    <Button
                        as='a'
                        href={oauthLogoutAddress}
                        style={{ marginLeft: '1.5em' }}
                    >
                        Logout
                    </Button>
                </Menu.Item>
            )
        }
    };

    return (  
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

{/********* Add below section ********

Other Menu.Item items will be just like hubcompare above.

************ End add *************/}

            {rightMenuItems()}
        </Menu>
    )

};

export default Navbar;