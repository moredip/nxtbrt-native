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
      return <Text style={styles.navBarTitle}>NxtBrt</Text>;
    }else{
      return <Text style={styles.navBarTitle}>{route.station.name}</Text>;
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
        <Text style={styles.navBarLeftButtonText}>
          &lt;
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
    backgroundColor: Colors.fgDark,
  },
  navBarTitle: {
    fontSize: 20,
    color: Colors.bgLight,
    fontWeight: '200',
    marginVertical: 7,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarLeftButtonText: {
    fontSize: 35,
    fontWeight: '100',
    marginTop: -4,
    color: Colors.bgLight,
  },
});
