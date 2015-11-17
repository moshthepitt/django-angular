/**
* SinglePostController
* @namespace thinkster.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.posts.controllers')
    .controller('SinglePostController', SinglePostController);

  SinglePostController.$inject = [
    '$location', '$routeParams', 'Authentication', 'Post', 'Snackbar'
  ];

  /**
  * @namespace SinglePostController
  */
  function SinglePostController($location, $routeParams, Authentication, Post, Snackbar) {
    var vm = this;

    vm.destroy = destroy;
    vm.update = update;

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated.
    * @memberOf thinkster.posts.controllers.SinglePostController
    */
    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      var id = $routeParams.id;      

      // Redirect if not logged in
      if (!authenticatedAccount) {
        $location.url('/');
        Snackbar.error('You are not authorized to view this page.');
      } 

      Post.get(id).then(postSuccessFn, postErrorFn);

      /**
      * @name postSuccessFn
      * @desc Update `post` for view
      */
      function postSuccessFn(data, status, headers, config) {
        vm.post = data.data;
        vm.user = authenticatedAccount;

        if (vm.user.username == vm.post.author.username) {
          vm.author_owner = true;
        } else {
          vm.author_owner = false;
        }
      }

      /**
      * @name postErrorFn
      * @desc Redirect to index
      */
      function postErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That post does not exist.');
      }
    }


    /**
    * @name destroy
    * @desc Destroy this post
    * @memberOf thinkster.posts.controllers.SinglePostController
    */
    function destroy() {
      if (vm.author_owner) {
        Post.destroy(vm.post).then(postSuccessFn, postErrorFn);
      } else {
        Snackbar.error("You are not authorised to perform this action");
      }

      /**
      * @name postSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function postSuccessFn(data, status, headers, config) {
        $location.url('/');
        // window.location = '/';

        Snackbar.show('Your post has been deleted.');
      }


      /**
      * @name postErrorFn
      * @desc Display error snackbar
      */
      function postErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }


    /**
    * @name update
    * @desc Update this post's post
    * @memberOf thinkster.posts.controllers.SinglePostController
    */
    function update() {
      if (vm.author_owner) {
        Post.update(vm.post).then(postSuccessFn, postErrorFn);
      } else {
        Snackbar.error("You are not authorised to perform this action");
      }

      /**
      * @name postSuccessFn
      * @desc Show success snackbar
      */
      function postSuccessFn(data, status, headers, config) {
        Snackbar.show('Your post has been updated.');
      }


      /**
      * @name postErrorFn
      * @desc Show error snackbar
      */
      function postErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();