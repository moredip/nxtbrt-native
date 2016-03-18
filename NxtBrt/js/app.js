'use strict';

import React, {
  AppRegistry,
} from 'react-native';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import reducer from './reducer';
import RootScene from './rootScene';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

store.subscribe( function(a,b,c){
  const state = store.getState();
  console.log('STATE:', state );
});

export default function WrappedApp(){
  return <Provider store={store}><RootScene/></Provider>;
}

