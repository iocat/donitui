// @flow
var React = require("react");
import {Card} from 'material-ui';

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

    render(){
        return <Card
            expanded={this.props.expanded} onExpandChange={this.props.onExpandChange}
            zDepth={this.state.depth} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                    {this.props.children}
                    </Card>
    }
}

FloatingCard.defaultProps = {
    normal: 1,
    shadow: 2,
}

FloatingCard.propTypes = {
    normal: React.PropTypes.number,
    shadow: React.PropTypes.number,

    expanded: React.PropTypes.bool,
    onExpandChange: React.PropTypes.func,
}
