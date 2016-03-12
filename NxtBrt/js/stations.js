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

function renderStation({name,on}){
  return (
    <View style={styles.stationContainer}>
      <TouchableOpacity onPress={on.press}>
        <Text style={styles.station}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function renderStations(){
  const ds = new ListView.DataSource({
    rowHasChanged: inequality
  }).cloneWithRows(STATIONS);

  function renderRow(rowData){
    const {
      abbr: stationId,
      name: stationName
    } = rowData;

    function pressHandler(){
      console.log('stations pressed: ',stationId);
    }

    return renderStation({name:stationName,on:{press:pressHandler}});
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
