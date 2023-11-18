export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validateNote = ( note ) => {
    const errors = {};

    if (note.title === "") {
        errors.title = "タイトルは入力してください。";
    }

    return errors;
};