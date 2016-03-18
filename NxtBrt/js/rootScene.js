'use strict';

import React, {
  Navigator,
  StyleSheet,
  Component,
} from 'react-native';

import {connect} from 'react-redux';

import renderNavBar from './navbar';
import StationsScreen from './stations';
import StationScreen from './station';

function mapStateToProps({selectedStation}){
  return {routeStack:routes(selectedStation)};
}

function homeRoute(){ return {name: 'STATIONS', index: 0}; }

function routes(selectedStation){
  if(selectedStation){
    return [
      homeRoute(),
      {name:'STATION', index:1, station:selectedStation}
    ];
  }else{
    return [ homeRoute() ];
  }
}


class PureNavigator extends Component {
  constructor(props,...rest){
    super(props,...rest);
    this.state = {
      currentRouteStack: [homeRoute()]
    };
  }

  componentWillReceiveProps({routeStack=[homeRoute()]}){
    // FIXME: actually implement
    const stackDiff = routeStack.length - this.state.currentRouteStack.length;

    switch( stackDiff ){
      case(1): 
        this.navigator.push(routeStack[routeStack.length-1]);
      case(-1):
        this.navigator.pop();
    }

    this.setState({
      ...this.state, 
      currentRouteStack: routeStack
    });
  }

  render(){
    return <Navigator
      style={styles.container}
      initialRoute={homeRoute()}
      renderScene={this.renderScene.bind(this)}
      navigationBar={renderNavBar()}
    />
  }

  renderScene(route,navigator){
    this.navigator = navigator;
    //function onStationPress(station){
      //navigator.push({name:'STATION',index:1,station:station});
    //}
    
    switch (route.name) {
      case('STATION'):
        return <StationScreen/>;
      case('STATIONS'):
        return <StationsScreen/>;
    }
  }
}

export default connect(mapStateToProps)(PureNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },
});
