"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequest = exports.patchRequest = exports.postRequest = exports.getRequest = void 0;
const xhr = new XMLHttpRequest();
const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            else {
                reject(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('GET', url);
        xhr.send();
    });
};
exports.getRequest = getRequest;
const postRequest = (url, data) => {
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            else {
                reject(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    });
};
exports.postRequest = postRequest;
const patchRequest = (url) => {
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            else {
                reject(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
    });
};
exports.patchRequest = patchRequest;
const deleteRequest = (url) => {
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            else {
                reject(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('DELETE', url);
        xhr.send();
    });
};
exports.deleteRequest = deleteRequest;
