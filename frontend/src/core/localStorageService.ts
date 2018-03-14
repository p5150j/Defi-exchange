const supportsLS = supportsLocalStorage();
const memoryStorage: any = {};

// safari incognito mode doesn't support localStorage...
export function setItem(name: string, value: any) {
    if (supportsLS) {
        window.localStorage.setItem(name, value);
    } else {
        memoryStorage[name] = value;
    }
}

export function getItem(name: string) {
    if (supportsLS) {
        return window.localStorage.getItem(name);
    } else {
        return memoryStorage[name];
    }
}
export function removeItem(name: string) {
    if (supportsLS) {
        return window.localStorage.removeItem(name);
    } else {
        delete memoryStorage[name];
    }
}

function supportsLocalStorage() {
    const mod = 'modernizr';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch (e) {
        return false;
    }
}
