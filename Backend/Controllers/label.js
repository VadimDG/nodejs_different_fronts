const labels = [{
    id: 1350493503725,
    name: 'Speed of sound',
}, {
    id: 1451393503745,
    name: 'take on me',
}];

const getAllLabels = function() {
    return labels;
}

const getLabelById = function(id) {
    return labels.find(x => x['id'] === id);
}

const addLabel = function(label) {
    try{
        label = {...label, id: Date.now()};
        labels.push(label);
        return 0;
    }
    catch (e) {
        console.log(e);
        return -1;
    }
}

const editLabel = function(id, label) {
    const labelIndex = labels.findIndex(x => x['id'] === parseInt(id));
    if (labelIndex === -1) {
        return;
    }
    labels[labelIndex] = label;
}

const deleteLabel = function(id) {
    labels = labels.filter(x => x['id'] !== parseInt(id));
}

export default {
    getAllLabels,
    getLabelById,
    addLabel,
    editLabel,
    deleteLabel
};