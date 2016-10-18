import React from 'react';
import {CardTitle, CardMedia} from 'material-ui/Card';
import {GoalVisibility} from '../../../data/index';

import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

export default class GoalCardHeader extends React.Component{
    isVisible = () => {
        return this.props.goal.visibility === GoalVisibility.PRIVATE;
    }

    /* TODO: set the states of visibility
        create a drop down list for buttons
        Decouple Checkbox button!*/
    render(){
        let goal = this.props.goal;
        let header = null;
        let cardTitle = (<CardTitle
                    title={goal.name }
                    subtitle={goal.description || ""}
                    className="card-title"></CardTitle>)
        let visibilityCheckbox = null;
        if (this.props.canUpdate){
            visibilityCheckbox = (
                <div className="visibility-checkbox">
                    <Checkbox 
                        checked={this.isVisible()}
                        checkedIcon={<VisibilityOff/>} 
                        uncheckedIcon={<Visibility/>}
                        />
                    </div>)
        }
        
        if (goal.img){
            header = (
                <CardMedia 
                    className="card-header"
                    overlay={cardTitle}>
                    <div 
                        style={{backgroundImage: 'url('+goal.img+')'}} 
                        className="header-img">
                        {visibilityCheckbox}
                        </div>
                    </CardMedia>
            )
        }else{
            header = (cardTitle)
        }
        return header
    }
}

GoalCardHeader.defaultProps = {
    canUpdate: false,
}

GoalCardHeader.propTypes={
    goal: React.PropTypes.object.isRequired,
    canUpdate: React.PropTypes.bool,
}