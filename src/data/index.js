
export const GoalStatus = {
    DONE: "DONE",
    NOT_DONE: "NOT_DONE",
    IN_PROGRESS :"IN_PROGRESS",
}

export const GoalVisibility = {
    PRIVATE: "PRIVATE",
    FOR_FOLLOWERS: "FOR_FOLLOWERS",
    PUBLIC: "PUBLIC",
}

export const TaskStatus = GoalStatus

export const UserStatus = {
    OFFLINE: "OFFLINE",
    ONLINE: "ONLINE",
    BUSY: "BUSY",
}

export const StatusFilter = {
    ALL:{
        [GoalStatus.DONE]: true,
        [GoalStatus.NOT_DONE]: true,
        [GoalStatus.IN_PROGRESS]: true,
    },
    DONE:{
        [GoalStatus.DONE]: true,
    },
    NOT_DONE : {
        [GoalStatus.NOT_DONE]: true,
    },
    IN_PROGESS: {
        [GoalStatus.IN_PROGRESS]: true,
    },
}