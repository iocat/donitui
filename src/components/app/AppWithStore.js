// TODO instead of app with store do GoalsWithStore: get rid of these
import {connect} from 'react-redux';
import MainApp from './MainApp';

export const AppWithStore = connect()(MainApp);