'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity,
} from 'react-native';

import Colors from './colors';

export default function renderNavBar(){
  return <Navigator.NavigationBar
      routeMapper={NavigationBarRouteMapper}
      style={styles.navBar}
    />;
}

const NavigationBarRouteMapper = {
  Title(route, navigator, index, navState){
    if( index === 0 ){
      return <Text>NxtBrt</Text>;
    }else{
      return <Text>{route.station.name}</Text>;
    }
  },

  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Home
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton(route,navigator,index,navState){
    return null;
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.bgLight
  },
});
