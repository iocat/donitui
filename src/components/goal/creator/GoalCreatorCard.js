import {GoalChanger, Mode} from './GoalChanger';
import {connect} from 'react-redux';

function mapStateToProps(rootReducer){
    return {
        mode: Mode.CREATE,
    }
}

function mapDispatchToProps(rootReducer){
    return {};
}

let GoalCreatorCard = connect(mapStateToProps, mapDispatchToProps)(GoalChanger);
export default GoalCreatorCard;