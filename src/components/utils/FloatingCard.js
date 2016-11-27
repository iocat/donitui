// @flow
var React = require("react");
import {Card, ListItem, Avatar, Divider} from 'material-ui';
import {
  green500
} from 'material-ui/styles/colors';

type Props = {
    normal: number,
    shadow: number,
}

// FloatingCard is a card with auto modify depth when the mouse overlays
export default class FloatingCard extends React.Component{
    static defaultProps: Props
    state: {
        depth: number,
    }
    constructor(props: Props){
        super(props);
        this.state = {
            depth: props.normal,
        }
    }
    onMouseOver = () => {
        this.setState({depth: this.props.shadow});
    }
    onMouseOut = () => {
        this.setState({depth: this.props.normal});
    }
    getHeader = ()=>{
        if(this.props.iconHeader) {
            return <div><ListItem disabled={true}
                    leftAvatar={<Avatar icon={this.props.iconHeader} backgroundColor={green500} size={35} />} >
                    {this.props.iconTitle}
                </ListItem>
                <Divider/>
            </div>
        }else if (this.props.iconTitle){
            return <div>
                <ListItem disabled={true}>
                    {this.props.iconTitle}
                </ListItem>
                <Divider/>
            </div>
        }
        return null;
    }
    render(){
        return <Card
            expanded={this.props.expanded} onExpandChange={this.props.onExpandChange}
            zDepth={this.state.depth} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                    {this.getHeader()}
                    {this.props.children}
                    </Card>
    }
}

FloatingCard.defaultProps = {
    normal: 1,
    shadow: 3,
}

FloatingCard.propTypes = {
    normal: React.PropTypes.number,
    shadow: React.PropTypes.number,

    iconHeader: React.PropTypes.node,
    cardTitle: React.PropTypes.node,

    expanded: React.PropTypes.bool,
    onExpandChange: React.PropTypes.func,
}
