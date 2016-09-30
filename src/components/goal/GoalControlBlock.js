import React from 'react';

import {CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class GoalControlBlock extends React.Component{
    render(){
        return (
            <CardActions style={{textAlign:"center"}}>
                    <FlatButton label="Edit" primary={true} 
                        style={
                            {
                                width:"40%",
                                display: "inline-block",
                                margin:"auto 5%"
                            }
                        } />
                    <FlatButton label="Delete" secondary={true} 
                        style={
                            {
                                width:"40%",
                                display:"inline-block",
                                margin: "auto 5%"
                            }
                        }/>
                    
                </CardActions>
        )
    }
}