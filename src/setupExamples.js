import type {
    Goal
} from './data/types';

export default (): Goal[] => {
    let getDateWithTime = (hour, min) => {
        let date = new Date();
        date.setHours(hour, min);
        return date
    }
    let goals: Goal[] = [{
        id: "1",
        name: "Complete a side project",
        visibility: "PUBLIC",
        img: "http://seo3.techdegreelink.com/sites/techdegreelink.com/files/styles/large/public/field/image/shutterstock_154519763.jpg?itok=XO3Vyt1F",
        tasks: [{
            name: "Code",
            repeatedReminder: {
                cycle: "EVERY_DAY",
                remindAt: getDateWithTime(10,17),
                duration: 30,
            },
        }, {
            name: "Think",
            repeatedReminder: {
                cycle: "EVERY_DAY",
                remindAt: new Date(),
                duration: 2,
            },
        }],
    }, {
        id: "2",
        name: "Get in shape",
        img: "http://www.aaanything.net/wp-content/uploads/2011/07/buff_kangaroo_come_at_me_bro.jpg",
        visibility: "PUBLIC",
        tasks: [{
            name: "Work out",
            repeatedReminder: {
                cycle: "EVERY_WEEK",
                days: {
                    0: true,
                    2: true,
                    4: true,
                },
                remindAt: getDateWithTime(6, 40),
                duration: 2,
            },
        }],
    }, {
        id: "3",
        name: "Get a cat",
        visibility: "FOR_FOLLOWERS",
        img: "http://www.aaanything.net/wp-content/uploads/2011/07/buff_kangaroo_come_at_me_bro.jpg",
        description: "LOLCAT",
        tasks: [{
            name: "Go to the vet",
            status:"DONE",
            reminder: {
                remindAt: new Date((new Date().getTime() - 23823000)),
                duration: 20,
            }
        }],
    }, {
        id: "4",
        name: "Be busy",
        visibility: "PRIVATE",
        status: "NOT_DONE",
        img: "http://www.aaanything.net/wp-content/uploads/2011/07/buff_kangaroo_come_at_me_bro.jpg",
        description: "",
        tasks: [{
            status: "DONE",
            name: "Be yourself",
            repeatedReminder: {
                cycle: "EVERY_WEEK",
                days: {
                    6: true,
                },
                remindAt: new Date(),
                duration: 100,
            }
        }],
    }];
    return goals;

}
