var ManagedObjectModel = require('./data/models/managedObjectModel');

var ManagedObjectController = require('./data/controllers/managedObjectController'),
    PersistantStorageController = require('./data/controllers/persistantStorageController');

module.exports = {
	name: 'uikit',
    inherits: require('util').inherits,
    
    ManagedObjectModel: ManagedObjectModel,
    
    ManagedObjectController: ManagedObjectController,
    PersistantStorageController: PersistantStorageController
};