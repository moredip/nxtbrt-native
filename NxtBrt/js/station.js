'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native';

import Colors from './colors';
import fetchEtds from './fetchEtds';

const FAKE_ETDS = [{"dest":{"name":"Fremont","abbr":"FRMT","lat":"37.557355","long":"-121.9764"},"minutes":2,"lineColor":"orange","length":"6"},{"dest":{"name":"Fremont","abbr":"FRMT","lat":"37.557355","long":"-121.9764"},"minutes":24,"lineColor":"orange","length":"6"},{"dest":{"name":"Richmond","abbr":"RICH","lat":"37.936887","long":"-122.353165"},"minutes":4,"lineColor":"orange","length":"6"},{"dest":{"name":"Richmond","abbr":"RICH","lat":"37.936887","long":"-122.353165"},"minutes":26,"lineColor":"white","length":"10"},{"dest":{"name":"Richmond","abbr":"RICH","lat":"37.936887","long":"-122.353165"},"minutes":27,"lineColor":"orange","length":"6"}];

function inequality(lhs,rhs){
  return lhs !== rhs;
}

function renderEtd(etd){
  const label = `${etd.dest.name}: ${etd.minutes} mins`; // FIXME: plural/singular
  return (
    <View style={[styles.etdContainer,styles[etd.lineColor]]}>
      <Text style={styles.etd}>{label}</Text>
    </View>
  );
}

export default class Station extends React.Component {
  constructor(props){
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: inequality
    });

    this.state = {ds,loading:true};
  }

  componentWillMount() {
    // TODO: cancel/ignore fetch if component is unmounted
    fetchEtds(this.props.station.id)
      .then(this.updateEtds.bind(this));
  }

  updateEtds(etds){
    this.setState( {ds: this.state.ds.cloneWithRows(etds), loading:false} );
  }

  render(){
    if( this.state.loading ){
      return <Text style={styles.loading}>loading...</Text>;
    }else{
      return (
        <ListView
          dataSource={this.state.ds}
          renderRow={renderEtd}
          style={styles.listView}
        />
      );
    }
  }
}


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
    fontSize: 30,
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
