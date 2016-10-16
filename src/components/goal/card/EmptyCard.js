import React from 'react';
import Paper from 'material-ui/Paper';

export default class EmptyCard extends React.Component{
    render(){
        return (
            <Paper zDepth={1} style={
                    {
                        height:"200px", 
                        lineHeight:"200px",
                        display: "flex",
                        justifyContent: "center", /* align horizontal */
                        alignItems: "center", /* align vertical */
                    }
                }>
                <p>You have no goal</p>
                </Paper>
        )
    }
}