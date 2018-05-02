import { connect } from 'react-redux';
import StationSelect from '../components/StationSelect';
import { getLocationObjectRemoteAction } from '../actions/location';

const mapStateToProps = state => ({
    user: state.user,
    location: state.location
});

const mapDispatchToProps = dispatch => ({
    getLocationObjectRemoteAction: () => dispatch(getLocationObjectRemoteAction())
});

const StationSelectContainer = connect(mapStateToProps, mapDispatchToProps)(StationSelect);

export default StationSelectContainer;