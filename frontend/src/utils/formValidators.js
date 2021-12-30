export let required = (value) => {

    if (value) {
        return undefined;
    } else {
        return "Field is required";
    }
}
export let maxLength20 = (value) => {

    if(value.length < 20) {
        return undefined;
    } else {
        return `Max length is 20`;
    }
}
export let math = (value) => {

    try {
        eval(value)
        return undefined;
    } catch (e) {
        return `Is not math expression`;
    }

}

export let loginValidator = (value) => {
    const regex = new RegExp('^[a-zA-Z0-9]+$');
    if (regex.test(value)) {

        return undefined;
    } else {
        return "Bad login! Use only a-z / A-Z / 0-9 ";
    }
}
export let passwordValidator = (value) => {
    const regex = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$');
    if (regex.test(value)) {
        return undefined;
    } else {
        return "Bad password! Password should contain at least 8 characters\n" +
            "contain at least 1 number\n" +
            "contain at least 1 lowercase character (a-z)\n" +
            "contain at least 1 uppercase character (A-Z)\n" +
            "contains only 0-9a-zA-Z ";
    }
}