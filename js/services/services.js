"use strict";

const postDate = async (url, data) => {
    const resolve = await fetch(url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data 
    });

    return await resolve.json();
};


const getResource = async url => {
    const resolve = await fetch(url);

    if(!resolve.ok) {
        throw new Error(`could not fetch ${url}, status: ${resolve.status}`);
    }

    return await resolve.json();
};

export {postDate};
export {getResource};