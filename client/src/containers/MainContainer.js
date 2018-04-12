import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import ComparisonShopper from '../components/ComparisonShopper';
import MarketBrowser from '../components/MarketBrowser';
import HangarManager from '../components/HangarManager';
import MarketManager from '../components/MarketManager';
import ProductionManager from '../components/ProductionManager';
import Welcome from '../components/Welcome';

const MainRouter = ({ user }) => {
    return (
        <Switch>
            <Route exact path='/'
                render={props => user.accessType ?
                    (<Redirect to='/marketbrowser'/>) : (<Welcome />)
                }
            />
            <Route path='/comparisonshopper'
                component={ComparisonShopper}
            />

            <Route path='/marketbrowser'
                component={MarketBrowser}
            />
            <Route path='/marketmanager'
                render={props => (user.accessType === 'write') ?
                    (<MarketManager />) : (<Redirect to='/marketbrowser'/>)
                }
            />
            <Route path='/hangarmanager'
                render={props => (user.accessType === 'write') ?
                    (<HangarManager />) : (<Redirect to='/marketbrowser'/>)
                }
            />
            <Route path='/productionmanager'
                render={props => (user.accessType === 'write') ?
                    (<ProductionManager />) : (<Redirect to='/marketbrowser'/>)
                }
            />
            <Route path='/'
                render={props =>
                    (<Redirect to='/marketbrowser'/>)
                }
            />
        </Switch>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

const MainContainer = withRouter(connect(mapStateToProps)(MainRouter));

export default MainContainer;