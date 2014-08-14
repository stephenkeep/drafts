var root = __base + 'core/frameworks/data/';

var ManagedObjectModel = require(root + 'models/managedObjectModel');

var ManagedObjectController = require(root + 'controllers/managedObjectController'),
    PersistantStorageController = require(root + 'controllers/persistantStorageController');

module.exports = {
	name: 'uikit',
    inherits: require('util').inherits,
    
    ManagedObjectModel: ManagedObjectModel,
    
    ManagedObjectController: ManagedObjectController,
    PersistantStorageController: PersistantStorageController
};