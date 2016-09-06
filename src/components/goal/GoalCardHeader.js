import React from 'react';
import {CardTitle, CardMedia, CardHeader} from 'material-ui/Card';
export default class GoalCardHeader extends React.Component{

    styles() {
        return {
            headerImg:{
                backgroundImage: 'url('+this.props.goal.img+')',
                backgroundSize: "cover",
                backgroundPosition:"center top",
                height: "300px"
            },
        }
    }
    render(){
        let goal = this.props.goal;
        let header = null;
        let styles = this.styles()
        if (goal.img){
            header = (
                <CardMedia  overlay={<CardTitle title={goal.name} subtitle={goal.description}/>}>
                    <div style={styles.headerImg}></div>
                    </CardMedia>)
        }else{
            header = (
                <CardHeader
                    title={goal.name}
                    subtitle={goal.description || ""}
                    />
            )
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