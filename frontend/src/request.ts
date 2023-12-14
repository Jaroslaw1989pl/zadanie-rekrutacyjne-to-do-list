const xhr = new XMLHttpRequest();

export const getRequest = (url: string) => {
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('GET', url);
        xhr.send();
    });
};

export const postRequest = (url: string, data: string) => {
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    });
};

export const patchRequest = (url: string) => {
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
    });
};

export const deleteRequest = (url: string) => {
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('DELETE', url);
        xhr.send();
    });
};