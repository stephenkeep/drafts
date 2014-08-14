var DATA = require(__base + 'core/frameworks/data');

//Public Methods
function Post() {
    DATA.ManagedObjectModel.apply(this, arguments);
    
}



DATA.inherits(Post, DATA.ManagedObjectModel);

module.exports = Post;