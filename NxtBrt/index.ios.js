'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

import StationsScreen from './js/stations';

function renderScene(route,navigator){
  return <StationsScreen navigator={navigator}/>;
}

function renderApp() {
  return (
      <StationsScreen/>
    //<Navigator
      //initialRoute={{name: 'Stations', index: 0}}
      //renderScene={renderScene}
    ///>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('NxtBrt', () => renderApp);
