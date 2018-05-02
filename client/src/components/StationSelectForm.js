import React, { Component } from 'react';
import Select from 'react-select';
import regionArray from '../data/regionArray';
import './components.css';
import {
    getSystemsInRegion, 
    getStationsInSystem,
    getStructuresBySystemName,
    getStructuresBySystemID
} from '../services/geography';

class StationSelectForm extends Component {
    constructor(props) {
        super(props);
        this.initialRegion = null;
        this.initialSystem = null;
        this.initialSearchText = '';
        this.initialStation = null;
        this.initialSystemsInRegion = [];
        this.initialStationsInSystem = [];
        this.initialStructuresInSystem = []
        this.state = {
            regionSelection: this.initialRegion,
            systemSelection: this.initialSystem,
            stationSearchText: this.initialSearchText,
            stationSelection: this.initialStation,
            systemsInRegion: this.initialSystemsInRegion,
            stationsInSystem: this.initialStationsInSystem,
            structuresInSystem: this.initialStructuresInSystem
        }
        this.changeRegion = this.changeRegion.bind(this);
        this.changeSystem = this.changeSystem.bind(this);
    }

    changeRegion(regionSelection) {
        const initials = {
            systemSelection: this.initialSystem,
            stationSelection: this.initialStation,            
            stationsInSystem: this.initialStationsInSystem,
            structuresInSystem: this.initialStructuresInSystem            
        }
        if (regionSelection) {
            getSystemsInRegion(regionSelection.value)
            .then(systemArray => {
                systemArray.sort((a, b) => 
                    (a.solarSystemName > b.solarSystemName) ? 1 : -1
                );
                this.setState({
                    regionSelection,
                    systemsInRegion: systemArray,
                    ...initials
                });
            })
        } else {
            this.setState({
                regionSelection: this.initialRegion,
                systemSelection: this.initialSystem,
                ...initials
            })
        }
    }

    changeSystem(systemSelection) {
        if (systemSelection) {
            Promise.all([
                getStationsInSystem(systemSelection.value),
                (this.props.user.accessType ?
                    getStructuresBySystemName(systemSelection.label, systemSelection.value) :
                    getStructuresBySystemID(systemSelection.value)
                )
            ])
            .then(([stationArray, structureArray]) => {
                console.log(stationArray);
                console.log(structureArray);
                this.setState({
                    systemSelection,
                    stationSelection: this.initialStation,            
                    stationsInSystem: stationArray,
                    structuresInSystem: structureArray
                });
            })
        } else {
            this.setState({
                systemSelection: this.initialSystem,
                stationSelection: this.initialStation,            
                stationsInSystem: this.initialStationsInSystem,
                structuresInSystem: this.initialStructuresInSystem
            })
        }
    }

    render() {
        const { regionSelection, systemSelection,
            systemsInRegion, stationSearchText,
            stationSelection, stationsInSystem,
            structuresInSystem } = this.state;

        return (
            <div className='ui form'>
                <div className='field inline'>
                    <label>Region</label>
                    <Select
                        name='regionSelect'
                        value={regionSelection}
                        onChange={this.changeRegion}
                        options={regionArray.map(region => {
                            return {
                                value: region.regionID,
                                label: region.regionName
                            }
                        })}
                    >
                    </Select>
                </div>
                <div className='field inline'>
                    <label>System</label>
                    <Select
                        name='systemSelect'
                        isDisabled={regionSelection === this.initialRegion}
                        value={systemSelection}
                        onChange={this.changeSystem}
                        options={systemsInRegion.map(system => {
                            return {
                                value: system.solarSystemID,
                                label: system.solarSystemName
                            }
                        })}
                    >
                    </Select>
                </div>
            </div>
        ) 
    }

}

export default StationSelectForm;