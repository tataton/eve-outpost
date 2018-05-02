import { connect } from 'react-redux';
import StationSelectForm from '../components/StationSelectForm';
import { setLocationLocalAction, setLocationRemoteAction } from '../actions/location';
import { getPastLocationsAction } from '../actions/pastLocations';

const mapStateToProps = state => ({
    user: state.user,
    location: state.location,
    pastLocations: state.pastLocations
});

const mapDispatchToProps = dispatch => ({
    getPastLocationsAction: () => dispatch(getPastLocationsAction()),
    setLocationLocalAction: (location) => dispatch(setLocationLocalAction(location)),
    setLocationRemoteAction: (location) => dispatch(setLocationRemoteAction(location))
});

const StationSelectFormContainer = connect(mapStateToProps, mapDispatchToProps)(StationSelectForm);

export default StationSelectFormContainer;