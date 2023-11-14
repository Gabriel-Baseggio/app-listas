export const sortByDateDesc = (a, b) => {
    if (new Date(a.lastUpdate) >= new Date(b.lastUpdate)) {
        return -1;
    } else {
        return 1;
    }
}

export const sortByDateAsc = (a, b) => {
    if (new Date(a.lastUpdate) < new Date(b.lastUpdate)) {
        return -1;
    } else {
        return 1;
    }
}

export const sortByNameAsc = (a, b) => {
    if (a.name <= b.name) {
        return -1;
    } else {
        return 1;
    }
}

export const sortByNameDesc = (a, b) => {
    if (a.name > b.name) {
        return -1;
    } else {
        return 1;
    }
}