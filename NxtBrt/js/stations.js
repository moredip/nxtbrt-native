'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

import STATIONS from './station-data';
import Colors from './colors';

function inequality(lhs,rhs){
  return lhs !== rhs;
}

function renderStation(station){
  return <View style={styles.stationContainer}>
    <Text style={styles.station}>{station.name}</Text>
  </View>;
}

export default function renderStations(){
  const ds = new ListView.DataSource({
    rowHasChanged: inequality
  }).cloneWithRows(STATIONS);

  return (
    <ListView
      dataSource={ds}
      renderRow={renderStation}
      style={styles.listView}
    />
  );
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: Colors.bgLight,
  },
  station: {
    fontSize: 30,
    alignSelf: "center",
  },
  stationContainer: {
    paddingVertical: 16,
    marginVertical: 2,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.fgDark
  }
});
