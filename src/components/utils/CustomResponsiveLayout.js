import React from 'react';

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveWidthProvider = WidthProvider(Responsive);
import {layouts, cols, breakpoints} from '../layout';
import type { Layout } from '../layout';

type Props = {
    layout : Layout,
}

export default class CustomResponsiveLayout extends React.Component {
    props: Props
    render(){
        return <ResponsiveWidthProvider
            breakpoints={breakpoints(this.props.layout)}
            cols={cols(this.props.layout)}
            layouts={layouts(this.props.layout)}>
            {this.props.children}
        </ResponsiveWidthProvider>;
    }
}
