var chai = require('chai');
var expect = chai.expect;
var $ = require('jquery');

var PostView = require('../app/scripts/views').PostView;
var Post = require('../app/scripts/models').Post;

// ################################################
// Model Tests
// ################################################
describe('Post', function(){
  describe('fetch', function(){
    it('should return a promise', function(){
      var promise = Post.fetch();
      expect(promise).to.respondTo('then');
    });

    it('should resolve with an array of posts', function(done){
      Post.fetch().then(function(posts){
        var firstPost = posts[0];
        expect(firstPost).to.have.property('title');
        expect(firstPost).to.have.property('body');
        expect(firstPost).to.have.property('_id');

        done();
      });
    });

    it("should trigger a posts:fetched event", function(done){

      $(document).on('posts:fetched', function(event, posts){
        expect(posts).to.be.an.instanceof(Array);
        done();
      });

      Post.fetch();
    });
  });
});

// ##############################
// View Tests
// ##############################
describe("PostView", function(){
  var view, posts;

  beforeEach(function(){
    posts = [{title: "Title", body: "Body"}];
    view = new PostView();
  });

  describe("showPosts", function(){
    it("should take a post array and list them", function(){
      view.showPosts(posts);
      expect($('.posts li').length).to.equal(1);
      expect($('.posts li h1').text()).to.equal("Title");
      expect($('.posts li p').text()).to.equal("Body");
    });
  });
});


describe("create post form", function(){
  it("should trigger a create:post event on the document with the title and body", function(done){
    $(document).on('create:post', function(event,elements){
      expect(elements).to.have.property("title");
      expect(elements).to.have.property("body");
      done();
    });
    $('.post-title').val("title");
    $('.post-body').val("body");
    $('#btn').click();
  });
});
