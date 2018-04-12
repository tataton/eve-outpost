import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserAction } from '../actions/user';
import View from '../components/View';

class App extends Component {

    componentDidMount() {
        this.props.getUserAction();
        window.refreshUser = this.props.getUserAction;
    }

    render(){
        return (
            <View />
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getUserAction: () => dispatch(getUserAction())
});

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default AppContainer;