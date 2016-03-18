import fetchEtds from './fetchEtds';

function receiveEtds(etds,stationId){
  return {
    type: 'ETDS_RECEIVED',
    etds,
    stationId
  };
}

export function selectStation(station){
  return function(dispatch){
    dispatch( {type:'STATION_SELECTED',station} );

    // TODO: handle failure
    fetchEtds(station.id)
      .then( (etds)=> dispatch(receiveEtds(etds,station.id)) );
  }
}
