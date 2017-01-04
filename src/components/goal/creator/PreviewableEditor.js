// @flow
import React from 'react';

type Props = {
    initEdit: boolean,
    editor: (modeSwitch: ()=>void)=>React$Element<any>,
    previewer: (modeSwitch: ()=>void)=>React$Element<any>,
}

export default class PreviewableEditor extends React.Component{
    state:{
        editMode: boolean,
    }
    static defaultProps:{
        initEdit: boolean,

    }
    constructor(props:Props){
        super(props);
        this.state = {
            editMode: props.initEdit,
        }
    }
    toEdit = ()=>{
        this.setState({editMode: true});
    }
    toPreview = ()=>{
        this.setState({editMode: false});
    }
    modeSwitch = () =>{
        this.setState({editMode: !this.state.editMode});
    }
    render() {
        if(this.state.editMode === true){
            return this.props.editor(this.modeSwitch);
        }else{
            return this.props.previewer(this.modeSwitch);
        }
    }
}

PreviewableEditor.defaultProps = {
    initEdit: false,
}

PreviewableEditor.propTypes = {
    initEdit: React.PropTypes.bool,
    editor: React.PropTypes.func.isRequired,
    previewer: React.PropTypes.func.isRequired,
}
