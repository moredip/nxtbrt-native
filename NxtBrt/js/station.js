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

import Colors from './colors';

function inequality(lhs,rhs){
  return lhs !== rhs;
}

function formattedDepartureTime(minsToDeparture){
  switch(minsToDeparture){
    case 0:
      return 'now';
    case 1:
      return '1 min';
    default:
      return `${minsToDeparture} mins`;
  }
}

function renderEtd(etd){
  const label = `${etd.dest.name}: ${formattedDepartureTime(etd.minutes)}`;
  return (
    <View style={[styles.etdContainer,styles[etd.lineColor]]}>
      <Text style={styles.etd}>{label}</Text>
    </View>
  );
}

function mapStateToProps({selectedStation,etds}){
  return {station:selectedStation,etds};
}

class Station extends React.Component {
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: inequality
    });
  }

  render(){
    const {etds} = this.props;
    if( etds ){
      const ds = this.ds.cloneWithRows(etds);
      return (
        <ListView
          dataSource={ds}
          renderRow={renderEtd}
          style={styles.listView}
        />
      );
    }else{
      return <Text style={styles.loading}>loading...</Text>;
    }
  }
}

export default connect(mapStateToProps)(Station);

const styles = StyleSheet.create({
  listView: {
    backgroundColor: Colors.bgLight,
  },
  loading: {
    paddingTop: 20,
    fontSize: 50,
    fontWeight: '200',
    alignSelf: "center",
  },
  etd: {
    fontSize: 20,
    alignSelf: "center",
  },
  etdContainer: {
    paddingVertical: 16,
    marginBottom: 1,
  },
  red:    { backgroundColor: '#e11a57' },
  orange: { backgroundColor: '#f9a11d' },
  yellow: { backgroundColor: '#fdf057' },
  green:  { backgroundColor: '#4fb848' },
  blue:   { backgroundColor: '#2aabe2' },
});
