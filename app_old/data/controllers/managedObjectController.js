var DATA = require('core/frameworks/data');

//Public Methods
function ManagedObjectController() {
    DATA.ManagedObjectController.apply(this, arguments);
    
}



DATA.inherits(ManagedObjectController, DATA.ManagedObjectController);

module.exports = ManagedObjectController;