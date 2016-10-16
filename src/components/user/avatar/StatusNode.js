import React from 'react';
import {greenA200} from 'material-ui/styles/colors';

export default class StatusNode extends React.Component{
    getColorStyle(){
        let color = this.props.color
        return {
            fill: color
        }
    }
    render(){
        let r = this.props.radius
        return <svg height={2*r} width={2*r} style={this.props.style}>
            <circle cx={r} cy={r} r={r} style={this.getColorStyle()}></circle>
        </svg>
    }
}

StatusNode.defaultProps = {
    color: greenA200,
    // Radius is the size 
    radius: 5
}