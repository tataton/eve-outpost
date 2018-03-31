import { connect } from 'react-redux';
import ErrorDisplay from '../components/ErrorDisplay';
import { dismissErrorAction } from '../actions/error';

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    dismissErrorAction: () => dispatch(dismissErrorAction())
});

const ErrorDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(ErrorDisplay);

export default ErrorDisplayContainer;