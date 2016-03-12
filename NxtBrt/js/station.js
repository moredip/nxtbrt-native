'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native';

import STATIONS from './station-data';
import Colors from './colors';

function inequality(lhs,rhs){
  return lhs !== rhs;
}

function renderEtd(number){
  return <Text>{number}</Text>;
}

export default function renderStation({stationId}){
  const ds = new ListView.DataSource({
    rowHasChanged: inequality
  }).cloneWithRows([1,2,3]);

  function renderRow(rowData){
    return renderEtd(rowData);
  }

  return (
    <ListView
      dataSource={ds}
      renderRow={renderRow}
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
