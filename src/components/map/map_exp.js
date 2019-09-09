import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Nav from '../nav/Nav';
import Sidebar from '../sidebar/Sidebar';
import RoutingForm from './routingForm';
import axios from 'axios';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getHere } from '../../store/actions';
import "./Map.css"


class Mapexp extends Component {

 componentDidMount(){
  // https://route.api.here.com/routing/7.2/calculateroute.json
  // ?app_id={YOUR_APP_ID}
  // &app_code={YOUR_APP_CODE}
  // &waypoint0=geo!52.516858379,13.3884717
  // &waypoint1=geo!52.51733824,13.394678415
  // &mode=fastest;car;traffic:disabled
  // &avoidareas=52.517100760,13.3905424488;52.5169701849,13.391808451
   let send = {
    app_id: 'arvginqRfleoK8308SvJ',
    app_code: 'sFz75OkwERmUxkBGeUjepg',
    waypoint0: '52.5160,13.3779',
    waypoint1: '52.5206,13.3862',
    mode: 'fastest;car;traffic:enabled',
    avoidareas: '52.517100760,13.3905424488;52.5169701849,13.391808451'
   }
   console.log("send", send)
   console.log("props2", this.props.getHere(send))
 }

 render(){
  console.log("props", this.props)
   return(
     <div className="logout-btn">h

     </div>
   );
 }
}

// function loadScript(url){
//   var index = window.document.getElementsByTagName("script")[0]
//   var script = window.document.createElement("script")
//   script.src = url
//   script.async = true
//   script.defer = true
//   index.parentNode.insertBefore(script, index)
  
// }


const mapStateToProps = state => ({})

export default withRouter(connect(
  mapStateToProps, { getHere }
)(Mapexp))