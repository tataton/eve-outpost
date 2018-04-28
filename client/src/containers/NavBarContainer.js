import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { push } from 'react-router-redux';
import { logOutUserAction } from '../actions/user';
import { 
    marketBrowserAddress, 
    comparisonShopperAddress, 
    marketManagerAddress, 
    hangarManagerAddress, 
    productionManagerAddress
} from '../navigation';

const mapStateToProps = state => ({
    user: state.user,
    router: state.router
});

const mapDispatchToProps = dispatch => ({
    logOutUserAction: () => dispatch(logOutUserAction()),
    navToMarketBrowser: () => dispatch(push(marketBrowserAddress)),
    navToComparisonShopper: () => dispatch(push(comparisonShopperAddress)),
    navToMarketManager: () => dispatch(push(marketManagerAddress)),
    navToHangarManager: () => dispatch(push(hangarManagerAddress)),
    navToProductionManager: () => dispatch(push(productionManagerAddress))
});

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;