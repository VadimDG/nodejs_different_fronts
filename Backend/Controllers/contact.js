import user from './user.js';
import label from './label.js';
import platform from './platform.js';

const contacts = [{
    id: 1350403503725,
    firstName: 'Bill',
    lastName: 'Smith',
    title: 'Company',
    Company: 'The best one',
    email: 'a.b@mail.com',
    phoneCell: '123',
    phoneBusiness: '456',
    fax: 'fax',
    addressLine1: 'addressLine1',
    addressLine2: 'addressLine2',
    city: 'World',
    State: 'NY',
    zip: '123',
    isActive: false,
    dateCreated: new Date(),
    dateModified: new Date()
}];

const contactToLabels = [{
    id: Date.now(),
    contactId: 1350403503725,
    labelId: 1350493503725
}];
const contactToMusicians = [{
    id: Date.now() + 1,
    contactId: 1350403503725,
    musicianId: 1650393503725
}];
const contactToPlatforms = [{
    id: Date.now() + 2,
    contactId: 1350403503725,
    platformId: 1650493503725
}];

const getAllContacts = function() {
    return contacts;
}

const getAllContactsWithRelations = function() {
    const platforms = platform.getAllPlatforms();
    const musicians = user.getAllUsers();
    const labels = label.getAllLabels();

    const getLabels = (contactId) => {
        const relatedLabels = contactToLabels.filter(x => x.contactId === contactId).map(x => x.labelId);
        return labels.filter(x => relatedLabels.includes(x.id));
    }

    const getPlatforms = (contactId) => {
        const relatedPlatforms = contactToPlatforms.filter(x => x.contactId === contactId).map(x => x.platformId);
        return platforms.filter(x => relatedPlatforms.includes(x.id));
    }

    const getMusicians = (contactId) => {
        const relatedMusicians = contactToMusicians.filter(x => x.contactId === contactId).map(x => x.musicianId);
        return musicians.filter(x => relatedMusicians.includes(x.id));
    }

    const contactsExtended = contacts.map(x => ({
        ...x,
        labels: getLabels(x.id),
        misicians: getMusicians(x.id),
        platforms: getPlatforms(x.id)
    }));

    return contactsExtended;
}

const getContactById = function(id) {
    return contacts.find(x => x['id'] === id);
}

const addContact = function(contact) {
    const oldContacts = structuredClone(contacts);

    const oldContactToLabel = structuredClone(contactToLabels);
    const oldContactToMusician = structuredClone(contactToMusicians);
    const oldContactToPlatform = structuredClone(contactToPlatforms);
    try{
        
        contact = {...contact, id: Date.now()};
        const newContactId = contact.id;
        contact.labelsIds.forEach((labelId, i) => {
            contactToLabels.push({ id: Date.now() + i, contactId: newContactId, labelId: labelId });
        });
        
        contact.musiciansIds.forEach((musicianId, i) => {
            contactToMusicians.push({ id: Date.now() + i, contactId: newContactId, musicianId: musicianId });
        });

        contact.platformsIds.forEach((platformId, i) => {
            contactToPlatforms.push({ id: Date.now() + i, contactId: newContactId, platformId: platformId });
        });

        delete contact.labelsIds;
        delete contact.musiciansIds;
        delete contact.platformsIds;

        contacts.push(contact);
        return 0;
    }
    catch (e) {
        contacts = oldContacts;
        contactToLabels = oldContactToLabel;
        contactToMusicians = oldContactToMusician;
        contactToPlatforms = oldContactToPlatform;

        console.log(e);
        return -1;
    }
}

const editContact = function(id, contact) {
    const oldContacts = structuredClone(contacts);

    const oldContactToLabel = structuredClone(contactToLabels);
    const oldContactToMusician = structuredClone(contactToMusicians);
    const oldContactToPlatform = structuredClone(contactToPlatforms);
    try
    {
        
        const editedContactIndex = contacts.findIndex(x => x['id'] !== parseInt(id));
        if (editedContactIndex === -1) {
            return -1;
        }
        
        const existingLabels = contactToLabels.filter(x => x.contactId === id).map(x => x.labelId);
        const labelIdsToDelete = existingLabels.filter(x => !contact.labelsIds.includes(x));
        const labelIdsToAdd = contact.labelsIds.filter(x => !existingLabels.includes(x));

        contactToLabels = contactToLabels.filter(x => !labelIdsToDelete.includes(x.labelId));
        
        labelIdsToAdd.forEach(labelId => {
            contactToLabels.push({ id: Date.now() + i, contactId: id, labelId: labelId });
        });

        const existingPlatforms = contactToPlatforms.filter(x => x.contactId === id).map(x => x.platformId);
        const platformIdsToDelete = existingPlatforms.filter(x => !contact.platformsIds.includes(x));
        const platformIdsToAdd = contact.platformsIds.filter(x => !existingPlatforms.includes(x));

        contactToPlatforms = contactToPlatforms.filter(x => !platformIdsToDelete.includes(x.platformId));
        
        platformIdsToAdd.forEach(platformId => {
            contactToPlatforms.push({ id: Date.now() + i, contactId: id, platformId: platformId });
        });

        const existingMusicians = contactToMusicians.filter(x => x.contactId === id).map(x => x.musicianId);
        const musicianIdsToDelete = existingMusicians.filter(x => !contact.musicianIds.includes(x));
        const musicianIdsToAdd = contact.musiciansIds.filter(x => !existingMusicians.includes(x));

        contactToMusicians = contactToMusicians.filter(x => !musicianIdsToDelete.includes(x.musicianId));
        
        musicianIdsToAdd.forEach(musicianId => {
            contactToMusicians.push({ id: Date.now() + i, contactId: id, musicianId: musicianId });
        });

        delete contact.labelsIds;
        delete contact.musiciansIds;
        delete contact.platformsIds;

        contacts[editedContactIndex] = contact;
        return 0;
    }
    catch (e) {
        contacts = oldContacts;
        contactToLabels = oldContactToLabel;
        contactToMusicians = oldContactToMusician;
        contactToPlatforms = oldContactToPlatform;

        console.log(e);
        return -1;
    }
}

const deleteContact = function(id) {
    const oldContacts = structuredClone(contacts);

    const oldContactToLabel = structuredClone(contactToLabels);
    const oldContactToMusician = structuredClone(contactToMusicians);
    const oldContactToPlatform = structuredClone(contactToPlatforms);
    
    try
    {
        const removedContact = contacts.find(x => x['id'] !== parseInt(id));
        if (!removedContact) {
            return -1;
        }
        contacts = contacts.filter(x => x['id'] !== parseInt(id));    
        
        contactToLabels = contactToLabels.filter(x => x.contactId !== removedContact.id);
        contactToMusicians = contactToMusicians.filter(x => x.contactId !== removedContact.id);
        contactToPlatforms = contactToPlatforms.filter(x => x.contactId !== removedContact.id);
        
        return 0;
    }
    catch (e) {
        contacts = oldContacts;
        contactToLabels = oldContactToLabel;
        contactToMusicians = oldContactToMusician;
        contactToPlatforms = oldContactToPlatform;

        console.log(e);
        return -1;
    }
}

export default {
    getAllContacts,
    getAllContactsWithRelations,
    getContactById,
    addContact,
    editContact,
    deleteContact
};