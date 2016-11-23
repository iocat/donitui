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

    getVisibilityCheckbox = () =>{
        if (this.props.canUpdate){
            return(
                <div className="visibility-checkbox">
                    <Checkbox
                        checked={this.isVisible()}
                        checkedIcon={<Visibility/>}
                        uncheckedIcon={<VisibilityOff/>}
                        />
                    </div>)
        }
        return null;
    }
    /* TODO: set the states of visibility
        create a drop down list for buttons
        Decouple Checkbox button!*/
    render(){
        let goal = this.props.goal;
        let visibilityCheckbox = this.getVisibilityCheckbox();
        let cardTitle = (<CardTitle
                    title={goal.name }
                    subtitle={goal.description || ""}
                    className="card-title"></CardTitle>)
        if (goal.img){
            return (
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
        }
        return <div className="card-header">{cardTitle}{visibilityCheckbox}</div>;
    }
}

GoalCardHeader.defaultProps = {
    canUpdate: false,
}

GoalCardHeader.propTypes={
    goal: React.PropTypes.object.isRequired,
    canUpdate: React.PropTypes.bool,
}
