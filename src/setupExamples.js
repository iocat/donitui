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
            img: "https://unsplash.it/200/300/?random",
            tasks: [{
                name: "Code",
                remindAt: getDateWithTime(10, 17),
                duration: 3000,
            },{
                name: "Read",
                remindAt: getDateWithTime(23,50),
                duration: 80,
            }],
            habits:[{
                name: "Think",
                days: {
                    1: true,
                    2: true,
                },
                offset: 1000,
                duration: 1000,
            },{
                name:"Stretch",
                days:{
                    1: true,
                    2: true,
                    6: true
                },
                offset: 4800,
                duration: 60
            }]
        },
        {
            id: "3",
            name: "Deploy the static app",
            visibility: "PUBLIC",
            img: "https://unsplash.it/200/300/?random",
            tasks: [{
                name: "Compile",
                remindAt: new Date(new Date().getTime()),
                duration: 1300
            },{
                name: "Think",
                remindAt: new Date(new Date().getTime() ),
                duration: 4000
            }],
            habits: []
        },{
            id: "4",
            name: "Make friend with stranger",
            visibility: "The one who is visiting this page",
            img: "https://unsplash.it/200/300/?random",
            tasks: [{
                name: "Hello World",
                remindAt: new Date(new Date().getTime()+ 30000),
                duration: 40,
            }],
            habits:[{
                name: "Say Thank You",
                days: {
                    0: true,
                    1: true,
                    2: true,
                    3: true,
                    4: true,
                    5: true,
                    6: true
                },
                offset: 350000,
                duration: 423,
            }],
        }
    ];
    return goals;
}
