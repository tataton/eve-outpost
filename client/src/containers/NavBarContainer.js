import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { push } from 'react-router-redux';

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    navToHubCompare: () => dispatch(push('/hubcompare')),
});

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;