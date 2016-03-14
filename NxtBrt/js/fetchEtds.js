const ETD_URL = "http://api.bart.gov/api/etd.aspx";
const API_KEY= encodeURIComponent("MW9S-E7SL-26DU-VV8V");

import STATIONS from './station-data';
import {DOMParser} from 'xmldom';


export default function loadEtds(stationAbbr){
  const url = `${ETD_URL}?key=${API_KEY}&cmd=etd&orig=${encodeURIComponent(stationAbbr)}`;
  return fetch(url)
    .then( (response)=> response.text() )
    .then( parseXml )
    .then(parseEtds);
}

function parseXml(text){
  return new DOMParser().parseFromString(text);
}

function parseEtds(doc){
  // this is an ugly imperative implementation because the `xmldom` module only exposes a crappy imperative API.
  let etds = [];

  const etdNodes = doc.getElementsByTagName('etd');

  for( let i = 0; i < etdNodes.length; i++ ){
    const etdNode = etdNodes[i];
    const destAbbr = pluckTextFromNode(etdNode, 'abbreviation');
    const destStation = lookupStationByAbbr(destAbbr);

    const estimateNodes = etdNode.getElementsByTagName('estimate');
    for( let i = 0; i < estimateNodes.length; i++ ){
      const estimateNode = estimateNodes[i];
      const etd = {
        dest: destStation,
        minutes: parseMinutes(pluckTextFromNode(estimateNode,'minutes')),
        lineColor: pluckTextFromNode(estimateNode,'color').toLowerCase(),
        length: pluckTextFromNode(estimateNode,'length')
      };
      etds.push(etd);
    }
  }

  return etds.sort( (a,b)=> a.minutes - b.minutes );
}


function lookupStationByAbbr(abbr){
  return STATIONS.find( (s)=> s.abbr === abbr );
}

function pluckTextFromNode(node,tagName){
  return node.getElementsByTagName(tagName)[0].textContent;
}

function parseMinutes(minutesString){
  const mins = parseInt(minutesString);
  return isNaN(mins) ? 0 : mins;
}
