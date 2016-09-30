import React from 'react';
import {CardTitle, CardMedia} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

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
            }
        }
    }
    render(){
        let goal = this.props.goal;
        let header = null;
        let styles = this.styles()
        let cardTitle = (<CardTitle
                    title={goal.name}
                    subtitle={goal.description || ""}
                    style={styles.cardTitle}></CardTitle>)
        if (goal.img){
            header = (
                <CardMedia  
                    overlay={cardTitle}>
                    <div style={styles.headerImg}></div>
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
        name: "",
        description: null
    }
}