/**
* Post
* @namespace thinkster.posts.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.posts.services')
    .factory('Post', Post);

  Post.$inject = ['$http'];

  /**
  * @namespace Post
  */
  function Post($http) {
    /**
    * @name Post
    * @desc The factory to be returned
    * @memberOf thinkster.posts.services.Post
    */
    var Post = {
      destroy: destroy,
      get: get,
      update: update
    };

    return Post;

    /////////////////////

    /**
    * @name destroy
    * @desc Destroys the given post
    * @param {Object} post The post to be destroyed
    * @returns {Promise}
    * @memberOf thinkster.posts.services.Post
    */
    function destroy(post) {
      return $http.delete('/api/v1/posts/' + post.id + '/');
    }


    /**
    * @name get
    * @desc Gets the post with id `id`
    * @param {string} id The id of the user to fetch
    * @returns {Promise}
    * @memberOf thinkster.posts.services.Post
    */
    function get(id) {
      return $http.get('/api/v1/posts/' + id + '/');
    }


    /**
    * @name update
    * @desc Update the given post
    * @param {Object} post The post to be updated
    * @returns {Promise}
    * @memberOf thinkster.posts.services.Post
    */
    function update(post) {
      return $http.put('/api/v1/posts/' + post.id + '/', post);
    }
  }
})();