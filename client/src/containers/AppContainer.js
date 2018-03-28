import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveUserAction } from '../actions/user';
import View from '../components/View';

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
        window.refreshUser = this.props.fetchUser;
    }

    render(){
        return (
            <View />
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        error: state.error        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(retrieveUserAction())
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;