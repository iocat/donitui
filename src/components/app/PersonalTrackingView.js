// @flow
import React from 'react';
import {connect} from 'react-redux';
import DocumentTitle from 'react-document-title';

import Layout from '../utils/CustomResponsiveLayout';
import {personalTracking} from '../layout';

import GoalFiltering from '../goal/GoalFiltering';
import Filter from '../goal/filter/Filter';
import ActiveTasks from '../scheduler/ActiveTasks';
import NextEvent from '../scheduler/NextEvent';

import type { RootReducer } from '../../data/reducers';

// PersonalTracking is a division page for the app
class _PersonalTracking extends React.Component {
    render() {
        /*if (this.props.userId !== this.props.params.userId){
            return <div>404{this.props.params.userId}</div>
        }*/
        return (
            <DocumentTitle title={this.props.title || "Donit"}>
                <Layout layout={personalTracking}>
                    <div key="listing">
                        <GoalFiltering canUpdate={true}/>
                    </div>
                    <div key="scheduling" className="scheduler-container">
                        <div className="scheduler">
                            <Filter/>
                            <br/>
                            <ActiveTasks/>
                            <br/>
                            <br/>
                            <NextEvent/>
                            <br/>
                        </div>
                    </div>
                </Layout>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = (rootReducer: RootReducer) => {
    return {
        title: rootReducer.goalTracking.pageTitle,
        userId: rootReducer.userService.userId,
    }
}

export default connect(mapStateToProps)(_PersonalTracking);
