var $ = require('jquery');

function Post(){

}

Post.fetch = function(){
  var promise = $.ajax('http://tiny-lasagna-server.herokuapp.com/collections/posts');

  promise.then(function(posts){
    $(document).trigger('posts:fetched', [posts]);
  });

  return promise;
};

module.exports = {
  Post: Post
};
