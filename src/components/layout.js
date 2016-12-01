// @flow
// contains layout object for react-grid-layout

type ComponentLayout ={
    i: string,
    x: number,
    y: number,
    w: number,
    h: number,
    static: boolean,
}
export type Layout = {
    layouts: {
        lg: ComponentLayout[],
        md: ComponentLayout[],
    },
    cols: {
        lg: number,
        md: number,
    },
    breakPts: {
        lg: number,
        md: number,
    }
}


export function layouts(component: Layout) {
    return component.layouts;
}

export function cols(component: Layout) {
    return component.cols;
}

export function breakpoints(component: Layout) {
    return component.breakPts;
}

const commonCols =  {
    lg: 12,
    md: 10,
}

const commonBreakPts = {
    lg: 1200,
    md: 996,
}
export const goalEdit: Layout= {
    layouts: {
        lg: [{
            i: "editorCard",
            x: 6,
            y: 0,
            w: 5,
            h: 1,
            static: true,
        }],
        md:[{
            i: "editorCard",
            x: 5,
            y: 0,
            w: 4,
            h: 1,
            static: true,
        }]
    },
    cols: commonCols,
    breakPts: commonBreakPts,
}

export const personalTracking: Layout = {
    layouts: {
        lg: [{
            i: "filtering",
            x: 5,
            y: 0,
            w: 5,
            h: 1,
            static: true
        }, {
            i: "scheduling",
            x: 1,
            y: 1,
            w: 3,
            h: 1,
            static: true
        }, ],
        md: [{
            i: "filtering",
            x: 4,
            y: 0,
            w: 5,
            h: 1,
            static: true
        }, {
            i: "scheduling",
            x: 1,
            y: 1,
            w: 3,
            h: 1,
            static: true
        }, ],
        /*sm: [
            {i:"goalTracking", x: 3, y: 0, w: 2, h:1, static:true}
        ],
        xs: [
            {i:"goalTracking", x: 2, y: 0, w: 2, h:1, static:true}
        ], */
    },
    cols: commonCols,
    breakPts: commonBreakPts,
}

export const goalTracking: Layout = {
    layouts: {
        lg: [{
            i: "filter",
            x: 0,
            y: 0,
            w: 12,
            h: 1,
            static: true
        }, {
            i: "goals",
            x: 0,
            y: 1,
            w: 12,
            h: 1,
            static: true
        }, ],
        md: [{
            i: "filter",
            x: 0,
            y: 0,
            w: 10,
            h: 1,
            static: true
        }, {
            i: "goals",
            x: 0,
            y: 1,
            w: 10,
            h: 1,
            static: true
        }],
        /*sm:[
            {i:"filter", x: 3, y: 0, w: 3, h: 1, static: true},
            {i:"goals", x: 0, y: 1, w: 6, h: 1, static: true}
        ],
        xs:[
            {i:"filter", x: 1, y: 0, w: 4, h: 1, static: true},
            {i:"goals", x: 0, y: 1, w: 5, h: 1,  static: true}
        ],*/
    },
    cols: commonCols,
    breakPts: commonBreakPts,
}
