const users = [{
    id: 1650393503725,
    name: 'A-ha',
}, {
    id: 1650393503745,
    name: 'Coldplay',
}];

const getAllUsers = function() {
    return users;
}

const getUserById = function(id) {
    return users.find(x => x['id'] === id);
}

const addUser = function(user) {
    try{
        user = {...user, id: Date.now()};
        users.push(user);
        return 0;
    }
    catch (e) {
        console.log(e);
        return -1;
    }
}

const editUser = function(id, user) {
    const userIndex = users.findIndex(x => x['id'] === parseInt(id));
    if (userIndex === -1) {
        return;
    }
    users[userIndex] = user;
}

const deleteUser = function(id) {
    users = users.filter(x => x['id'] !== parseInt(id));
}

export default {
    getAllUsers,
    getUserById,
    addUser,
    editUser,
    deleteUser
};