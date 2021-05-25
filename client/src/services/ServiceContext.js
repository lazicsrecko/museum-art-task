import React, { Component, createContext } from 'react';
import MainService from './main-service';

export const ServiceContext = createContext();

class ServiceContextProvider extends Component {
    constructor(props){
        super(props);
        this.state.mainService = new MainService('http://localhost:3001');
    }
    state = {}
    render() {
        return (
            <ServiceContext.Provider value={{ ...this.state }} >
                {this.props.children}
            </ServiceContext.Provider>
        )
    } 
}

export default ServiceContextProvider;