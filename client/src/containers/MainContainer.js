import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import Hubcompare from '../components/HubCompare';
import Welcome from '../components/Welcome';

const MainRouter = ({ user }) => {
    return (
        <Switch>
            <Route exact path='/'
                render={props => {
                    if (!user.accessType) {
                        return (<Welcome />)
                    }
                    
                }}
            />
            <Route path='/hubcompare'
                render={props => {
                    return (<Hubcompare />)
                    }
                }
            />
{/******* Remove below section *******/}
            <Route path='/'
                render={props =>
                    (<Redirect to='/hubcompare'/>)
                }
            />
{/*********** End remove *************/}

{/********* Add below section ********
    These bits will require user.accessType to resolve (which
    is why we've injected state here.)


            <Route path='/market'
                render={props =>
                    (<Market />)
                }
            />
            <Route path='/stock'
                render={props =>
                    requiresWriteAccess(Stock)
                }
                />
            <Route path='/orders'
                render={props =>
                    requiresWriteAccess(Orders)
                }
            />
            <Route path='/blueprints'
                render={props =>
                    requiresWriteAccess(Blueprints)
                }
            />
            <Route exact path='/'
                render={props =>
                    (<Welcome />)
                }
            />
            <Route path='/'
                render={props =>
                    (<Redirect to='/'/>)
                }
            />

************ End add *************/}

        </Switch>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

const MainContainer = connect(mapStateToProps)(MainRouter);

export default MainContainer;