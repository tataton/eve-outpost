import { connect } from 'react-redux';
import StationFinderForm from '../components/StationFinderForm';
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

const StationFinderFormContainer = connect(mapStateToProps, mapDispatchToProps)(StationFinderForm);

export default StationFinderFormContainer;