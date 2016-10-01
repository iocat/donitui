import React from 'react';

import {CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class GoalControlBlock extends React.Component {
    render() {
        return (
            <CardActions style={{ textAlign: "right" }}>
                <FlatButton label="Delete" secondary={true}
                    style={
                        {
                            width: "10%",
                            display: "inline-block",
                            margin: "auto 1%"
                        }
                    }/>
                <FlatButton label="Edit" primary={true}
                    style={
                        {
                            width: "10%",
                            display: "inline-block",
                            margin: "auto 1%"
                        }
                    } />
            </CardActions>
        )
    }
}