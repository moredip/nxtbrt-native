'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity,
} from 'react-native';

import renderNavBar from './navbar';
import StationsScreen from './stations';
import StationScreen from './station';


export default renderApp;

function renderScene(route,navigator){
  function onStationPressed(station){
    navigator.push({name:'STATION',index:1,station:station});
  }

  switch (route.name) {
    case('STATION'):
      return <StationScreen station={route.station}/>;
    case('STATIONS'):
      return <StationsScreen onStationPressed={onStationPressed}/>;
  }
}

function renderApp() {
  return (
    <Navigator
      style={styles.container}
      initialRoute={{name: 'STATIONS', index: 0}}
      renderScene={renderScene}
      navigationBar={renderNavBar()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },
});
