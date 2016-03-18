import STATIONS from './station-data';

const initialState = {
  stations: STATIONS
}

export default function reducer(state=initialState,action){
  switch( action.type ){
    case 'STATION_SELECTED':
      return {
        ...state,
        selectedStation: action.station,
      };
    case 'ETDS_RECEIVED':
      if( action.stationId === (state.selectedStation||{}).id ){
        return {
          ...state,
          etds: action.etds
        };
      }
    case 'HOME':
      return {
        ...state,
        selectedStation: null
      };
  }

  return state;
}
