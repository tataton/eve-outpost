import React, { Component } from 'react';
import './components.css';
import StationSelectFormContainer from '../containers/StationSelectFormContainer';

class StationSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            formActive: false,
            location: {
                savedLocationID: ('location' in this.props) ? this.props.location.savedLocationID : 0,
                savedLocationName: ('location' in this.props) ? this.props.location.savedLocationName : ''                
            }
        }
        this.openStationSelect = this.openStationSelect.bind(this);
    }

    componentDidMount() {
        if (('user' in this.props) && this.props.user.characterID && ('location' in this.props) && !this.state.location.savedLocationID) {
            this.setState({
                location: this.props.getLocationObjectRemoteAction()
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (('user' in this.props) && this.props.user.characterID && (this.props.user.characterID !== prevProps.user.characterID)) {
            this.setState({
                location: this.props.getLocationObjectRemoteAction()
            })
        }
    }

    openStationSelect() {
        this.setState({formActive: true})
    }

    render() {

        const selectedStation = () => (this.state.location.savedLocationID) ?
            (<p>Selected Location: {this.state.location.savedLocationName}</p>) :
            (<p>No location selected yet.</p>) ;

        const toggleButton = () => {
            const offButtonText = (this.state.location.savedLocationID) ?
                                    'Select a new location' :
                                    'Select a location' ;
            return (this.state.formActive) ?
                        (<div className='ui button'></div>) :
                        (<div className='ui button' onClick={this.openStationSelect}>{offButtonText}</div>) ;
        }

        return (
            <div className='ui top fixed menu secondmenu'>
                {selectedStation()}
                <div className='item right secondmenuitem'>
                    {toggleButton()}
                </div>
            </div>
        )
/* To insert above:
                <div className='ui stationfinder'>
                    <StationSelectFormContainer />
                </div>
*/

    }
}

export default StationSelect;