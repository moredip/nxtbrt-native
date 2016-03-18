'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';

import {selectStation} from './actions';
import Colors from './colors';

export default connect(mapStateToProps,mapDispatchToProps)(Stations);

function mapStateToProps({stations}){
  return {stations};
}
function mapDispatchToProps(dispatch){
  return {
    onStationPress: (station)=> dispatch(selectStation(station))
  };
}

function renderStation({station,onPress}){
  return (
    <View style={styles.stationContainer}>
      <TouchableOpacity onPress={()=>onPress(station)}>
        <Text numberOfLines={1} style={styles.station}>{station.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

function Stations({stations,onStationPress}){
  const ds = new ListView.DataSource({
    rowHasChanged: inequality
  }).cloneWithRows(stations);

  function renderRow(rowData){
    const {
      abbr: stationId,
      name: stationName
    } = rowData;

    const station = {
      name:stationName,
      id:stationId
    };

    return renderStation({station,onPress:onStationPress});
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

function inequality(lhs,rhs){
  return lhs !== rhs;
}

