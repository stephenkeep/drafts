function ManagedObjectController() {
    this.name = 'managedObjectController';
    this.objects = {};
}

ManagedObjectController.prototype.observer = function (changes) {
    
    var self = this;
    
    changes.forEach(function(change) {
        
        if (change.type === 'update') {
            
            console.log(change);
            
            if (self.delegate && self.delegate.objectUpdated) {
                
                self.delegate.objectUpdated(self, change.object.constructor.name, change.object);
            }
        }
    });
};

ManagedObjectController.prototype.addObject = function (type, object) {
    
    if (!this.objects[type]) {
        this.objects[type] = [];
    }
    
    this.objects[type].push(object);
    
    Object.observe(object, this.observer.bind(this));
    
    if (this.delegate && this.delegate.objectAdded) {
        this.delegate.objectAdded(this, type, object);
    }
};

ManagedObjectController.prototype.removeObject = function (type, object) {
    
    var index = this.objects[type].indexOf(object);
    
    if (index > -1) {
        
        Object.unobserve(object, this.observer);
        
        this.objects[type].splice(index, 1);
        
        if (this.delegate && this.delegate.objectRemoved) {
            
            this.delegate.objectRemoved(this, type, object);
        }
    }

};

module.exports = ManagedObjectController;