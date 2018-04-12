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
                render={props => {
                    if (!user.accessType) {
                        return (<Welcome />)
                    } else {
                        return (<Redirect to='/comparisonshoppper'/>)
                    }
                }}
            />
            <Route path='/comparisonshopper'
                component={ComparisonShopper}
            />

            <Route path='/marketbrowser'
                component={MarketBrowser}
            />              
            <Route path='/'
                render={props =>
                    (<Redirect to='/comparisonshopper'/>)
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