function splitStringUsingRegex(text) {
    let result = [];
    const regex = /[\s\S]/gu;
    let match;
    while ((match = regex.exec(text)) !== null) {
        result.push(match[0]);
    }
    return result;
}

export default splitStringUsingRegex;