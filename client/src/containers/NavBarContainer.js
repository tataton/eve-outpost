import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { push } from 'react-router-redux';
import { logOutUserAction } from '../actions/user';

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    logOutUserAction: () => dispatch(logOutUserAction()),
    navToComparisonShopper: () => dispatch(push('/comparisonshopper')),
    navToMarketBrowser: () => dispatch(push('/marketbrowser')),
    navToMarketManager: () => dispatch(push('/marketmanager')),
    navToHangarManager: () => dispatch(push('/hangarmanager')),
    navToProductionManager: () => dispatch(push('/productionmanager'))
});

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;