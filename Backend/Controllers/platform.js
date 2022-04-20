const platforms = [{
    id: 1650493503725,
    name: 'Spotify',
}, {
    id: 1651393503745,
    name: 'Google',
}];

const getAllPlatforms = function() {
    return platforms;
}

const getPlatformById = function(id) {
    return platforms.find(x => x['id'] === id);
}

const addPlatform = function(platform) {
    try{
        platform = {...platform, id: Date.now()};
        platforms.push(platform);
        return 0;
    }
    catch (e) {
        console.log(e);
        return -1;
    }
}

const editPlatform = function(id, platform) {
    const platformIndex = platforms.findIndex(x => x['id'] === parseInt(id));
    if (platformIndex === -1) {
        return;
    }
    platforms[platformIndex] = platform;
}

const deletePlatform = function(id) {
    platforms = platforms.filter(x => x['id'] !== parseInt(id));
}

export default {
    getAllPlatforms,
    getPlatformById,
    addPlatform,
    editPlatform,
    deletePlatform
};