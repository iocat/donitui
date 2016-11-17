// @flow
var React = require('react');
import {FloatingActionButton as Button} from 'material-ui';

export class ActivatableButton extends React.Component{
    static defaultProps: {
        active: boolean,
    }
    render(){
        let active: boolean = this.props.active;
        let fn: ()=> void = this.props.func;
        let activate = () =>{
            if (active){
                fn();
            }
        }
        return <Button disabled={!active} mini={true} onTouchTap={activate}>
                    {this.props.children}
                    </Button>
    }
}

ActivatableButton.defaultProps = {
    active: true,
}

ActivatableButton.propTypes = {
    active: React.PropTypes.bool.isRequired,
    func: React.PropTypes.func.isRequired,
}
