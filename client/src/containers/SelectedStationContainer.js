import { connect } from 'react-redux';
import SelectedStation from '../components/SelectedStation';

const mapStateToProps = state => ({
    location: state.location
});

const SelectedStationContainer = connect(mapStateToProps)(SelectedStation);

export default SelectedStationContainer;