import { connect } from 'react-redux';
import ErrorDisplay from '../components/ErrorDisplay';
import { dismissErrorAction } from '../actions/error';

const mapStateToProps = state => ({
    errorMessage: state.errorMessage
});

const mapDispatchToProps = dispatch => ({
    dismissErrorAction: () => dispatch(dismissErrorAction())
});

const ErrorDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(ErrorDisplay);

export default ErrorDisplayContainer;