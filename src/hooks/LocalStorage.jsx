import {useState, useEffect} from 'react';

function UseLocalStorage(initialState, key) {
    let get = () => {
        const order = JSON.parse(localStorage.getItem(key));

        return order ? order : initialState
    };

    const [value, setValue] = useState(get);

    useEffect(() => {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
        // eslint-disable-next-line
    }, [value]);

    return [value, setValue];
}

export { UseLocalStorage }
