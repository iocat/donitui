import React from 'react';
import {CardTitle, CardMedia} from 'material-ui/Card';
import {GoalVisibility} from '../../actions/goals';

import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

export default class GoalCardHeader extends React.Component{
    styles() {
        return {
            headerImg:{
                backgroundImage: 'url('+this.props.goal.img+')',
                backgroundSize: "cover",
                backgroundPosition:"center top",
                height: "300px"
            },
            cardTitle:{
                textAlign:"center"
            },
            mediaContainer:{
                position: "relative",
            },
            visibilityCheckBox:{
                position: "absolute",
                top: "14px",
                right: "25px",
                width:"10px",
                height: "10px",
            },
            visibilityIcon:{
                height: "21px", 
                width: "21px",
                margin: "auto auto",
            },
        }
    }
    isVisible = () => {
        return this.props.goal.visibility === GoalVisibility.PRIVATE;
    }

    /* TODO: set the states of visibility
        create a drop down list for buttons
        Decouple Checkbox button!*/
    render(){
        let goal = this.props.goal;
        let header = null;
        let styles = this.styles()
        let cardTitle = (<CardTitle
                    title={goal.name }
                    subtitle={goal.description || ""}
                    style={styles.cardTitle}></CardTitle>)
        let visibilityCheckbox = null;
        if (this.props.canUpdate){
            visibilityCheckbox = (
                <Checkbox 
                    checked={this.isVisible()}
                    style={styles.visibilityCheckBox}
                    checkedIcon={<VisibilityOff style={styles.visibilityIcon}/>} 
                    uncheckedIcon={<Visibility style={styles.visibilityIcon}/>}
                    />)
        }
        
        if (goal.img){
            header = (
                <CardMedia 
                    style={styles.mediaContainer} 
                    overlay={cardTitle}>
                    <div style={styles.headerImg}>{visibilityCheckbox}</div>
                    </CardMedia>
            )
        }else{
            header = (cardTitle)
        }
        return header
    }
}

GoalCardHeader.defaultProps = {
    goal:{
        img: null,
        visibility: GoalVisibility.FOR_FOLLOWERS,
        name: "",
        description: null
    },
    canUpdate: false,
}