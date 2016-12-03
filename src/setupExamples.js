import type {
    Goal
} from './data/types';

export default (): Goal[] => {
    let getDateWithTime = (hour, min) => {
            let date = new Date();
            date.setHours(hour, min);
            return date
        }
        //TODO: this list remains duplicated
    let goals: Goal[] = [
        {
            id: "1",
            name: "Add image uploader to DONIT",
            description: "UNIMPLEMENTED",
            visibility: "PUBLIC",
            img: "http://seo3.techdegreelink.com/sites/techdegreelink.com/files/styles/large/public/field/image/shutterstock_154519763.jpg?itok=XO3Vyt1F",
            tasks: [{
                name: "Code",
                repeatedReminder: {
                    cycle: "EVERY_DAY",
                    remindAt: getDateWithTime(10, 17),
                    duration: 30,
                },
            }, {
                name: "Think",
                repeatedReminder: {
                    cycle: "EVERY_DAY",
                    remindAt: new Date(new Date().getTime() + 60000),
                    duration: .5,
                },
            }]
        },
        {
            id: "3",
            name: "Deploy the static app",
            visibility: "PUBLIC",
            img: "http://faculty.ycp.edu/~dhovemey/spring2011/cs320/lecture/figures/compileAndLink.png",
            tasks: [{
                name: "Compile",
                reminder: {
                    remindAt: new Date(new Date().getTime()-1000),
                    duration: .5,
                },
            }],
        },{
            id: "4",
            name: "Make friend with stranger",
            visibility: "The one who is visiting this page",
            img: "http://cdnimg.in/wp-content/uploads/2015/06/dancing_baby_bears.jpg?cfaea8",
            tasks: [{
                name: "Hello World",
                reminder: {
                    remindAt: new Date(new Date().getTime()+ 30000),
                    duration: 1,
                },
            },{
                name: "Say Thank You",
                repeatedReminder: {
                    cycle: "EVERY_WEEK",
                    days: {
                        0: true,
                        2: true,
                        3: true,
                        4: true,
                    },
                    remindAt: new Date(new Date().getTime()+ 60000),
                    duration: 1.5,
                }
            }],
        }
    ];
    return goals;
}
