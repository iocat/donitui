export function layouts(component) {
    return component.layouts;
}

export function cols(component) {
    return component.cols;
}

export function breakpoints(component) {
    return component.breakpoints;
}

const commonBreakpts = {
    lg: 1200,
    md: 996,
}

export const personalTracking = {
    layouts: {
        lg: [{
            i: "goalFilter",
            x: 6,
            y: 0,
            w: 5,
            h: 1,
            static: true
        }, {
            i: "scheduler",
            x: 1,
            y: 1,
            w: 4,
            h: 1,
            static: true
        }, ],
        md: [{
            i: "goalFilter",
            x: 5,
            y: 0,
            w: 5,
            h: 1,
            static: true
        }, {
            i: "scheduler",
            x: 1,
            y: 1,
            w: 4,
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
    cols: {
        lg: 12,
        md: 10,
        /*sm: 6,
        xs: 5, */
    },
    breakpoints: commonBreakpts,
}

export const goalTracking = {
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
    cols: {
        lg: 12,
        md: 10,
    },
    breakpoints: commonBreakpts,
}
