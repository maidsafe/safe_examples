/**
 * Manage network data controller
 */
window.maidsafeDemo.controller('NetworkDataCtrl', [ '$rootScope', '$scope', '$state', 'MESSAGES', 'safeApiFactory',
  function($rootScope, $scope, $state, $msg, safe) {
    'use strict';
    $scope.selectedFolder = null;
    $scope.explorerRootPath = $state.params.folderPath || '';

    var onServiceCreated = function(err) {
      var goToManageService = function() {
        $state.go('manageService');
      };
      $rootScope.$loader.hide();
      if (err) {
        return $rootScope.prompt.show('Publish Service Error', 'Failed to add new service\n', function() {}, {
          title: 'Reason',
          ctx: err.data.description
        });
      }
      var msg = 'Service ' + $state.params.serviceName + ' published';
      $rootScope.prompt.show('Service Published', msg, goToManageService);
    };

    $scope.setTargetFolder = function(name) {
      if (name) {
        return $scope.selectedFolder = name;
      }
      $scope.selectedFolder = null;
    };

    $scope.createFromTemplate = function() {
      $state.go('sampleTemplate', {
        serviceName: $state.params.serviceName,
        remap: $state.params.remap
      });
    };

    $scope.goToPublicFolder = function() {
      debugger;
      $state.go('manageNetworkData', {
        folderPath: 'public'
      });
    };

    $scope.onProgress = function(percentage, isUpload) {
      if (!$rootScope.progressBar.isDisplayed()) {
        $rootScope.progressBar.start(isUpload ? 'Uploading' : 'Downloading');
      }
      $rootScope.progressBar.update(Math.floor(percentage));
    };

    $scope.mapService = function() {
      var serviceName = $state.params.serviceName;
      if (!serviceName) {
        return;
      }
      var addService = function() {
        $rootScope.$loader.show($msg.REMAP_SERVICE);
        safe.addService(safe.getUserLongName(), serviceName, false, $scope.selectedFolder, onServiceCreated);
      };

      if ($state.params.remap) {
        $rootScope.$loader.show($msg.REMAP_SERVICE);
        return safe.deleteService(safe.getUserLongName(), serviceName, function(err, res) {
          $rootScope.$loader.hide();
          if (err) {
            return $rootScope.prompt.show('Remap Service Error', 'Failed to remap service\n', function() {}, {
              title: 'Reason',
              ctx: err.data.description
            });
          }
          addService();
        });
      }
      addService();
    };
  }
]);