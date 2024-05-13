
export const setTitle = (title: string) => {
    document.title = title;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const currentDate = () => {
    const date = new Date();
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export const getLogo = (department: string): NodeRequire => {
    const logos: Record<string, NodeRequire> = {
        csp: require('@assets/csp.png'),
        asp: require('@assets/asp.png'),
        tep: require('@assets/tep.png'),
        etp: require('@assets/etp.png'),
        np: require('@assets/np.png'),
        cjep: require('@assets/cjep.png'),
        ap: require('@assets/ap.png'),
        bap: require('@assets/bap.png'),
        executive: require('@assets/executive.png')
    }

    return logos[department.toLowerCase()];
}

export const colors: Record<string, string> = {
    ap: '#6F9DF5',
    asp: '#1CA51A',
    bap: '#F1C21B',
    cjep: '#F11B1B',
    csp: '#AB28B6',
    etp: '#F1751B',
    np: '#7E7B7B',
    tep: '#032D6C',
}

export const format = (name: string) => {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
}

export type EmptyObject = Record<string, string>;