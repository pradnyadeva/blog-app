const truncate = (words, maxlength) => {
    return `${words.slice(0, maxlength)} …`;
};

export default truncate;