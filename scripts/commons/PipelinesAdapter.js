'use strict';

var self = PipelinesAdapter;
module.exports = self;
require('./ActErr');
var async = require('async');
var request = require('request');
var logger = console;
function PipelinesAdapter(jFrogPipelinesSessionId, baseUrl, token) {
  // logger.trace('Initializing', self.name,'for jFrogPipelinesSessionId:',
    // jFrogPipelinesSessionId);
  this.jFrogPipelinesSessionId = jFrogPipelinesSessionId;
  this.baseUrl = baseUrl;
  this.token = token
}

/***********************/
/*     HTTP METHODS    */
/***********************/
/* GET PUT POST DELETE */
/***********************/

// generic GET method
PipelinesAdapter.prototype.get = function (relativeUrl, callback) {
  // logger.trace(util.format('Pipelines GET data %s for ' +
  //   'jFrogPipelinesSessionId: %s', relativeUrl, this.jFrogPipelinesSessionId));
  var opts = {
    method: 'GET',
    url: relativeUrl.indexOf('http') === 0 ?
      relativeUrl : this.baseUrl + relativeUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'jfrog-pipelines-session-id': this.jFrogPipelinesSessionId
    },
    timeout: 180000
  };
  // Only set a token for non-public adapter.
  if (this.token) {
    /*jshint -W069 */
    if (this.token.indexOf('Bearer') === 0) {
      opts.headers['Authorization'] = this.token;
    } else {
      opts.headers['Authorization'] = 'apiToken ' + this.token;
    }
    /*jshint +W069 */
  }
  var bag = {
    opts: opts,
    relativeUrl: relativeUrl,
    token: this.token,
    jFrogPipelinesSessionId: this.jFrogPipelinesSessionId
  };

  async.series([
      _performCall.bind(null, bag),
      _parseResponse.bind(null, bag)
    ],
    function () {
      callback(bag.err, bag.parsedBody, bag.res);
    }
  );
};

// generic POST method
PipelinesAdapter.prototype.post = function (relativeUrl, json, callback) {
  // logger.trace(util.format('Pipelines POST data %s for ' +
  //   'jFrogPipelinesSessionId: %s', relativeUrl, this.jFrogPipelinesSessionId));
  var opts = {
    method: 'POST',
    url: relativeUrl.indexOf('http') === 0 ?
      relativeUrl : this.baseUrl + relativeUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'jfrog-pipelines-session-id': this.jFrogPipelinesSessionId
    },
    json: json,
    timeout: 180000
  };

  if (this.token) {
    /*jshint -W069 */
    if (this.token.indexOf('Bearer') === 0) {
      opts.headers['Authorization'] = this.token;
    } else {
      opts.headers['Authorization'] = 'apiToken ' + this.token;
    }
    /*jshint +W069 */
  }

  var bag = {
    opts: opts,
    relativeUrl: relativeUrl,
    token: this.token,
    jFrogPipelinesSessionId: this.jFrogPipelinesSessionId
  };

  async.series([
      _performCall.bind(null, bag),
      _parseResponse.bind(null, bag)
    ],
    function () {
      callback(bag.err, bag.parsedBody, bag.res);
    }
  );
};


// generic PUT method
PipelinesAdapter.prototype.put = function (relativeUrl, json, callback) {
  // logger.trace(util.format('Pipelines PUT data %s for ' +
  //   'jFrogPipelinesSessionId: %s', relativeUrl, this.jFrogPipelinesSessionId));
  var opts = {
    method: 'PUT',
    url: relativeUrl.indexOf('http') === 0 ?
      relativeUrl : this.baseUrl + relativeUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'jfrog-pipelines-session-id': this.jFrogPipelinesSessionId
    },
    json: json,
    timeout: 180000
  };

  if (this.token) {
    /*jshint -W069 */
    if (this.token.indexOf('Bearer') === 0) {
      opts.headers['Authorization'] = this.token;
    } else {
      opts.headers['Authorization'] = 'apiToken ' + this.token;
    }
    /*jshint +W069 */
  }

  var bag = {
    opts: opts,
    relativeUrl: relativeUrl,
    token: this.token,
    jFrogPipelinesSessionId: this.jFrogPipelinesSessionId
  };

  async.series([
      _performCall.bind(null, bag),
      _parseResponse.bind(null, bag)
    ],
    function () {
      callback(bag.err, bag.parsedBody, bag.res);
    }
  );
};

// generic DELETE method
PipelinesAdapter.prototype.delete = function (relativeUrl, callback) {
  // logger.debug(util.format('Pipelines DELETE data %s for' +
  //   'jFrogPipelinesSessionId: %s', relativeUrl, this.jFrogPipelinesSessionId));
  var opts = {
    method: 'DELETE',
    url: relativeUrl.indexOf('http') === 0 ?
      relativeUrl : this.baseUrl + relativeUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'jfrog-pipelines-session-id': this.jFrogPipelinesSessionId
    },
    timeout: 180000
  };

  if (this.token) {
    /*jshint -W069 */
    if (this.token.indexOf('Bearer') === 0) {
      opts.headers['Authorization'] = this.token;
    } else {
      opts.headers['Authorization'] = 'apiToken ' + this.token;
    }
    /*jshint +W069 */
  }

  var bag = {
    opts: opts,
    relativeUrl: relativeUrl,
    token: this.token,
    jFrogPipelinesSessionId: this.jFrogPipelinesSessionId
  };

  async.series([
      _performCall.bind(null, bag),
      _parseResponse.bind(null, bag)
    ],
    function () {
      callback(bag.err, bag.parsedBody, bag.res);
    }
  );
};

// generic DELETE method
PipelinesAdapter.prototype.deleteWithBody = function (relativeUrl, json, callback) {
  // logger.debug(util.format('Pipelines DELETE data %s for' +
  //   'jFrogPipelinesSessionId: %s', relativeUrl, this.jFrogPipelinesSessionId));
  var opts = {
    method: 'DELETE',
    json: json,
    url: relativeUrl.indexOf('http') === 0 ?
      relativeUrl : this.baseUrl + relativeUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'jfrog-pipelines-session-id': this.jFrogPipelinesSessionId
    },
    timeout: 180000
  };

  if (this.token) {
    /*jshint -W069 */
    if (this.token.indexOf('Bearer') === 0) {
      opts.headers['Authorization'] = this.token;
    } else {
      opts.headers['Authorization'] = 'apiToken ' + this.token;
    }
    /*jshint +W069 */
  }

  var bag = {
    opts: opts,
    relativeUrl: relativeUrl,
    token: this.token,
    jFrogPipelinesSessionId: this.jFrogPipelinesSessionId
  };

  async.series([
      _performCall.bind(null, bag),
      _parseResponse.bind(null, bag)
    ],
    function () {
      callback(bag.err, bag.parsedBody, bag.res);
    }
  );
};

// common helper methods
function _performCall(bag, next) {
  var who = self.name + '|' + _performCall.name + '|jFrogPipelinesSessionId:' +
    bag.jFrogPipelinesSessionId;
  // logger.trace('Inside', who);

  bag.startedAt = Date.now();
  request(bag.opts,
    function (err, res, body) {
      var interval = Date.now() - bag.startedAt;
      // logger.trace(who, 'Pipelines request ' + bag.opts.method + ' ' +
      //   bag.relativeUrl + ' took ' + interval +
      //   ' ms and returned HTTP status ' + (res && res.statusCode));

      bag.res = res;
      bag.body = body;
      bag.statusCode = res && res.statusCode;
      if (res && res.statusCode > 299) err = err || res.statusCode;
      if (err) {
        logger.error(who, 'Pipelines returned status', err,
          'for request', bag.relativeUrl);
        bag.err = err;
      }
      return next();
    }
  );
}

function _parseResponse(bag, next) {
  /* jshint maxcomplexity:15 */
  var who = self.name + '|' + _parseResponse.name +
    '|jFrogPipelinesSessionId:' + bag.jFrogPipelinesSessionId;
  // logger.trace('Inside', who);

  if (bag.err) {
    // Return something with an ActErr error ID
    var newErr = {
      id: ActErr.ApiServerError,
      message: bag.opts.method + ' ' + bag.relativeUrl + ' returned ' + bag.err
    };
    if (299 < bag.err && bag.err < 400)
      newErr.id = ActErr.ShippableAdapter300;
    else if (399 < bag.err && bag.err < 500)
      newErr.id = ActErr.ShippableAdapter400;
    else if (499 < bag.err && bag.err < 600)
      newErr.id = ActErr.ShippableAdapter500;
    bag.err = newErr;
  }

  if (bag.body) {
    if (typeof bag.body === 'object') {
      bag.parsedBody = bag.body;
      if (bag.err && bag.parsedBody && bag.parsedBody.id)
        bag.err = bag.parsedBody;
    } else {
      try {
        bag.parsedBody = JSON.parse(bag.body);
        if (bag.err && bag.parsedBody && bag.parsedBody.id)
          bag.err = bag.parsedBody;
      } catch (e) {
        if (!bag.err)
          logger.error(who, 'Unable to parse bag.body', bag.body, e);
        bag.err = bag.err || {
          id: ActErr.OperationFailed,
          message: 'Could not parse response'
        };
      }
    }
  }

  if (bag.err)
    bag.err.statusCode = bag.statusCode;
  if (bag.err) {
    console.info(bag.parsedBody)
  }
  return next();
}

/***************************/
/*         ROUTES          */
/***************************/
/* Sorted alphabetically   */
/* by folder name in order */
/* as seen in Routes.js    */
/***************************/

// buildPlaneImages
PipelinesAdapter.prototype.getBuildPlaneImages =
  function (query, callback) {
    var url = '/buildPlaneImages?' + query;
    this.get(url, callback);
  };

// extensionSources

PipelinesAdapter.prototype.getExtensionSourceById =
  function (extensionSourceId, callback) {
    var url = '/extensionSources/' + extensionSourceId;
    this.get(url, callback);
  };

// templateSources

PipelinesAdapter.prototype.joinSocket =
  function (body, callback) {
    var url = '/passthrough/sockets/joinRoom';
    this.post(url, body, callback);
  };

PipelinesAdapter.prototype.getTemplateSourceById =
  function (templateSourceId, callback) {
    var url = '/templateSources/' + templateSourceId;
    this.get(url, callback);
  };

// hooks
PipelinesAdapter.prototype.getHooks =
  function (query, callback) {
    var url = '/hooks?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.postHook =
  function (body, callback) {
    var url = '/hooks';
    this.post(url, body, callback);
  };

PipelinesAdapter.prototype.putHookById =
  function (hookId, body, callback) {
    var url = '/hooks/' + hookId;
    this.put(url, body, callback);
  };

PipelinesAdapter.prototype.deleteHookById =
  function (hookId, callback) {
    var url = '/hooks/' + hookId;
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.triggerHookById =
  function (hookId, body, callback) {
    var url = '/hooks/' + hookId + '/hook';
    this.post(url, body, callback);
  };

// templates
PipelinesAdapter.prototype.getTemplates =
  function (query, callback) {
    var url = '/templates?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getTemplateById =
  function (templateId, callback) {
    var url = '/templates/' + templateId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getArtifactUrlByTemplateId =
  function (templateId, artifactName, callback) {
    var url = '/templates/' + templateId + '/artifactUrl?artifactName=' +
      artifactName;
    this.get(url, callback);
  };

// masterResources
PipelinesAdapter.prototype.getMasterResources =
  function (query, callback) {
    var url = '/masterResources?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getMasterResourceById =
  function (masterResourceId, callback) {
    var url = '/masterResources/' + masterResourceId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.putMasterResourceById =
  function (masterResourceId, body, callback) {
    var url = '/masterResources/' + masterResourceId;
    this.put(url, body, callback);
  };

PipelinesAdapter.prototype.getArtifactUrlByMasterResourceId =
  function (masterResourceId, artifactName, callback) {
    var url = '/masterResources/' + masterResourceId +
      '/artifactUrl?artifactName=' + artifactName;
    this.get(url, callback);
  };

// templates
PipelinesAdapter.prototype.getTemplates =
  function (query, callback) {
    var url = '/templates?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getTemplateById =
  function (templateId, callback) {
    var url = '/templates/' + templateId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.putTemplateById =
  function (templateId, body, callback) {
    var url = '/templates/' + templateId;
    this.put(url, body, callback);
  };

// resourceVersions
PipelinesAdapter.prototype.getResourceVersions =
  function (query, callback) {
    var url = '/resourceVersions?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getResourceVersionsLight =
  function (query, callback) {
    var url = '/resourceVersions/light?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getResourceVersionById =
  function (resourceVersionId, callback) {
    var url = '/resourceVersions/' + resourceVersionId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deleteResourceVersionById =
  function (resourceVersionId, callback) {
    var url = '/resourceVersions/' + resourceVersionId;
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.deleteResourceVersionsByResourceId =
  function (resourceId, callback) {
    var url = '/resources/' + resourceId + '/resourceVersions';
    this.delete(url, callback);
  };

// runs
PipelinesAdapter.prototype.deleteRunsByPipelineId =
  function (pipelineId, callback) {
    var url = '/pipelines/' + pipelineId + '/runs';
    this.delete(url, callback);
  };

// runResourceVersions
PipelinesAdapter.prototype.postRunResourceVersion =
  function (json, callback) {
    var url = '/runResourceVersions';
    this.post(url, json, callback);
  };
PipelinesAdapter.prototype.getRunResourceVersions =
  function (query, callback) {
    var url = '/runResourceVersions?' + query;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.getRunResourceVersionsLight =
  function (query, callback) {
    var url = '/runResourceVersions/light?' + query;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.putRunResourceVersionById =
  function (id, json, callback) {
    var url = '/runResourceVersions/' + id;
    this.put(url, json, callback);
  };
PipelinesAdapter.prototype.deleteRunResourceVersionsByPipelineId =
  function (pipelineId, callback) {
    var url = '/pipelines/' + pipelineId + '/runResourceVersions';
    this.delete(url, callback);
  };

// resources
PipelinesAdapter.prototype.getResourceById =
  function (resourceId, callback) {
    var url = '/resources/' + resourceId;
    this.get(url, callback);
  };

// projects
PipelinesAdapter.prototype.postProject =
  function (json, callback) {
    var url = '/projects';
    this.post(url, json, callback);
  };
PipelinesAdapter.prototype.getProjects =
  function (query, callback) {
    var url = '/projects?' + query;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.getProjectById =
  function (projectId, callback) {
    var url = '/projects/' + projectId;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.putProjectById =
  function (projectId, json, callback) {
    var url = '/projects/' + projectId;
    this.put(url, json, callback);
  };

// pipelines
PipelinesAdapter.prototype.getPipelineById =
  function (pipelineId, callback) {
    var url = '/pipelines/' + pipelineId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.postPipeline =
  function (json, callback) {
    var url = '/pipelines';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.postPipelineSource =
  function (json, callback) {
    var url = '/pipelineSources';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.getPipelines =
  function (query, callback) {
    var url = '/pipelines?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deletePipelineById =
  function (pipelineId, query, callback) {
    var url = '/pipelines/' + pipelineId + '?' + query;
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.getArtifactUrlByPipelineId =
  function (pipelineId, artifactName, callback) {
    var url = '/pipelines/' + pipelineId + '/artifactUrl?artifactName=' +
      artifactName;
    this.get(url, callback);
  };

// runs
PipelinesAdapter.prototype.getRunById =
  function (runId, callback) {
    var url = '/runs/' + runId;
    this.get(url, callback);

  };
PipelinesAdapter.prototype.getRuns =
  function (query, callback) {
    var url = '/runs?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deleteRunById =
  function (runId, callback) {
    var url = '/runs/' + runId;
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.getArtifactUrlByRunId =
  function (runId, artifactName, callback) {
    var url = '/runs/' + runId + '/artifactUrl?artifactName=' +
      artifactName;
    this.get(url, callback);
  };

// runStepConnections
PipelinesAdapter.prototype.getRunStepConnections =
  function (query, callback) {
    var url = '/runStepConnections?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.putRunStepConnectionById =
  function (id, json, callback) {
    var url = '/runStepConnections/' + id;
    this.put(url, json, callback);
  };


// resourceVersions
PipelinesAdapter.prototype.postResourceVersion =
  function (json, callback) {
    var url = '/resourceVersions';
    this.post(url, json, callback);
  };

// runStepConnections
PipelinesAdapter.prototype.deleteRunStepConnectionsByPipelineId =
  function (pipelineId, callback) {
    var url = '/pipelines/' + pipelineId + '/runStepConnections';
    this.delete(url, callback);
  };

// pipelineStepConnections
PipelinesAdapter.prototype.postPipelineStepConnection =
  function (json, callback) {
    var url = '/pipelineStepConnections';
    this.post(url, json, callback);
  };
PipelinesAdapter.prototype.getPipelineStepConnections =
  function (query, callback) {
    var url = '/pipelineStepConnections?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deletePipelineStepConnectionById =
  function (pipelineStepConnectionId, callback) {
    var url = '/pipelineStepConnections/' + pipelineStepConnectionId;
    this.delete(url, callback);
  };

// pipelineSourceObjectPermissions
PipelinesAdapter.prototype.getPipelineSourceObjectPermissions =
  function (query, callback) {
    var url = '/pipelineSourceObjectPermissions?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.postPipelineSourceObjectPermission =
  function (body, callback) {
    var url = '/pipelineSourceObjectPermissions';
    this.post(url, body, callback);
  };

PipelinesAdapter.prototype.deletePipelineSourceObjectPermissionById =
  function (pipelineSourceObjectPermissionId, callback) {
    var url = '/pipelineSourceObjectPermissions/' +
      pipelineSourceObjectPermissionId;
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.deletePipelineSourceObjectPermissionsByObjectId =
  function (objectType, objectId, callback) {
    var url = '/pipelineSourceObjectPermissions/' + objectType + '/' + objectId;
    this.delete(url, callback);
  };
  
PipelinesAdapter.prototype.postRunStepConnection =
  function (json, callback) {
    this.post('/runStepConnections', json, callback);
  };

PipelinesAdapter.prototype.
  deletePipelineSourceObjectPermissionsByPipelineSourceId =
    function (pipelineSourceId, callback) {
      var url = '/pipelineSourceObjectPermissions/pipelineSource/' +
        pipelineSourceId;
      this.delete(url, callback);
    };

// pipelineSources
PipelinesAdapter.prototype.getPipelineSources =
  function (query, callback) {
    var url = '/pipelineSources?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getPipelineSourceById =
  function (pipelineSourceId, callback) {
    var url = '/pipelineSources/' + pipelineSourceId;
    this.get(url, callback);
  };

// pipelineSyncStatuses
PipelinesAdapter.prototype.getPipelineSyncStatuses =
  function (query, callback) {
    var url = '/pipelineSyncStatuses?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deletePipelineSyncStatusById =
  function (statusId, callback) {
    var url = '/pipelineSyncStatuses/' + statusId;
    this.delete(url, callback);
  };

// statistics
PipelinesAdapter.prototype.getStatistics =
  function (query, callback) {
    var url = '/statistics?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.postStatistic =
  function (body, callback) {
    var url = '/statistics';
    this.post(url, body, callback);
  };

PipelinesAdapter.prototype.deleteStatisticById =
  function (statisticId, callback) {
    var url = '/statistics/' + statisticId;
    this.delete(url, callback);
  };

// steplets
PipelinesAdapter.prototype.getStepletById =
  function (stepletId, callback) {
    var url = '/steplets/' + stepletId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getSteplets =
  function (query, callback) {
    var url = '/steplets?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.postSteplet =
  function (json, callback) {
    this.post('/steplets', json, callback);
  };

// systemConfigs

PipelinesAdapter.prototype.getSystemConfigByName =
  function (configName, callback) {
    var url = '/systemConfigs/' + configName;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deleteStepletById =
  function (stepletId, callback) {
    var url = '/steplets/' + stepletId;
    this.delete(url, callback);
  };

// stepletTestReports

// stepletTestReports
PipelinesAdapter.prototype.deleteStepletTestReportsByPipelineId =
  function (pipelineId, callback) {
    this.delete(
      util.format('/pipelines/%s/stepletTestReports', pipelineId),
      callback
    );
  };

PipelinesAdapter.prototype.deleteStepletTestReportsByStepletId =
  function (stepletId, callback) {
    var url = '/steplets/' + stepletId + '/stepletTestReports';
    this.delete(url, callback);
  };


// stepConsoles
PipelinesAdapter.prototype.postStepConsoles =
  function (json, callback) {
    this.post('/stepConsoles', json, callback);
  };

PipelinesAdapter.prototype.deleteStepConsolesByStepId =
  function (stepId, callback) {
    var url = '/steps/' + stepId + '/stepConsoles';
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.deleteStepConsolesByPipelineId =
  function (pipelineId, callback) {
    var url = '/pipelines/' + pipelineId + '/stepConsoles';
    this.delete(url, callback);
  };

// stepTestReports
PipelinesAdapter.prototype.deleteStepTestReportsByStepId =
  function (stepId, callback) {
    var url = '/steps/' + stepId + '/stepTestReports';
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.deleteStepTestReportsByPipelineId =
  function (pipelineId, callback) {
    var url = '/pipelines/' + pipelineId + '/stepTestReports';
    this.delete(url, callback);
  };

// steps
PipelinesAdapter.prototype.getSteps =
  function (query, callback) {
    var url = '/steps?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getStepById =
  function (stepId, callback) {
    var url = '/steps/' + stepId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.sendApprovalResponse =
  function (stepId, body, callback) {
    var url = `/steps/${stepId}/approvalResponse`;
    this.post(url, body, callback);
  };
PipelinesAdapter.prototype.getArtifactUrlByStepId =
  function (stepId, artifactName, callback) {
    var url = '/steps/' + stepId + '/artifactUrl?artifactName=' + artifactName;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.putStepById =
  function (stepId, json, callback) {
    var url = '/steps/' + stepId;
    this.put(url, json, callback);
  };

PipelinesAdapter.prototype.putRunById =
  function (stepId, json, callback) {
    var url = '/runs/' + stepId;
    this.put(url, json, callback);
  };

PipelinesAdapter.prototype.cancelRun =
  function (runId, json, callback) {
    var url = '/runs/' + runId + '/cancel';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.updateStepStatusByStepId =
  function (stepId, json, callback) {
    var url = '/steps/' + stepId + '/status';
    this.put(url, json, callback);
  };
  
PipelinesAdapter.prototype.deleteStepsByPipelineId =
  function (pipelineId, callback) {
    var url = '/pipelines/' + pipelineId + '/steps';
    this.delete(url, callback);
  };

// pipelineSteps
PipelinesAdapter.prototype.postPipelineStep =
  function (json, callback) {
    var url = '/pipelineSteps';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.getPipelineSteps =
  function (query, callback) {
    var url = '/pipelineSteps?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getPipelineStepById =
  function (pipelineStepId, callback) {
    var url = '/pipelineSteps/' + pipelineStepId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.putPipelineStepById =
  function (pipelineStepId, json, callback) {
    var url = '/pipelineSteps/' + pipelineStepId;
    this.put(url, json, callback);
  };

PipelinesAdapter.prototype.deletePipelineStepById =
  function (pipelineStepId, query, callback) {
    var url = '/pipelineSteps/' + pipelineStepId + '?' + query;
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.getArtifactUrlByPipelineStepId =
  function (pipelineStepId, artifactName, callback) {
    var url = '/pipelineSteps/' + pipelineStepId +
      '/artifactUrl?artifactName=' + artifactName;
      this.get(url, callback);
  };
// Pipeline Steplets

PipelinesAdapter.prototype.postPipelineSteplet =
  function (json, callback) {
    var url = '/pipelineSteplets';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.getPipelineSteplets =
  function (query, callback) {
    var url = '/pipelineSteplets?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getPipelineStepletById =
  function (pipelineStepletId, callback) {
    var url = '/pipelineSteplets/' + pipelineStepletId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.putPipelineStepletById =
  function (pipelineStepletId, json, callback) {
    var url = '/pipelineSteplets/' + pipelineStepletId;
    this.put(url, json, callback);
  };

PipelinesAdapter.prototype.deletePipelineStepletById =
  function (pipelineStepletId, query, callback) {
    var url = '/pipelineSteplets/' + pipelineStepletId + '?' + query;
    this.delete(url, callback);
  };

// stepletConsoles
PipelinesAdapter.prototype.getStepletConsolesByStepletId =
  function (stepletId, query, callback) {
    var url = '/steplets/' + stepletId + '/consoles?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deleteStepletConsolesByStepletId =
  function (stepletId, callback) {
    var url = '/steplets/' + stepletId + '/stepletConsoles';
    this.delete(url, callback);
  };

// steplets
PipelinesAdapter.prototype.getSteplets =
  function (query, callback) {
    var url = '/steplets?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.putStepletById =
  function (stepletId, json, callback) {
    var url = '/steplets/' + stepletId;
    this.put(url, json, callback);
  };

PipelinesAdapter.prototype.deleteStepletsByPipelineId =
  function (pipelineId, callback) {
    var url = '/pipelines/' + pipelineId + '/steplets';
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.deleteStepletConsolesByPipelineId =
  function (pipelineId, callback) {
    var url = '/pipelines/' + pipelineId + '/stepletConsoles';
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.
  deleteSystemServiceInstanceStatsBySystemServiceInstanceId =
  function (systemServiceInstanceId, callback) {
    var url = '/systemServiceInstances/' + systemServiceInstanceId +
      '/systemServiceInstanceStats';
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.getArtifactUrlByStepletId =
  function (StepletId, artifactName, callback) {
    var url = '/steplets/' + StepletId + '/artifactUrl?artifactName=' +
      artifactName;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.putStepletById =
  function (stepletId, json, callback) {
    var url = '/steplets/' + stepletId;
    this.put(url, json, callback);
  };

// resources
PipelinesAdapter.prototype.putResourceById =
  function (id, json, callback) {
    var url = '/resources/' + id;
    this.put(url, json, callback);
  };


PipelinesAdapter.prototype.deleteResourceById =
  function (resourceId, query, callback) {
    var url = '/resources/' + resourceId + '?' + query;
    this.delete(url, callback);
  };

PipelinesAdapter.prototype.getResources =
  function (query, callback) {
    var url = '/resources?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.postResource =
  function (json, callback) {
    var url = '/resources';
    this.post(url, json, callback);
  };

// getSHAByIntegrationId
PipelinesAdapter.prototype.getSHAByIntegrationId =
  function (accountIntegrationId, query, callback) {
    this.get(
      util.format(
        '/passthrough/projectIntegrations/%s/sha?%s',
        accountIntegrationId, query
      ),
      callback
    );
  };

// getBranchesByIntegrationId
PipelinesAdapter.prototype.getBranchesByIntegrationId =
  function (projectIntegrationId, query, callback) {
    this.get(
      util.format(
        '/passthrough/projectIntegrations/%s/branches?%s',
        projectIntegrationId, query
      ),
      callback
    );
  };

// masterIntegrationFields
PipelinesAdapter.prototype.getMasterIntegrationFields =
  function (query, callback) {
    var url = '/masterIntegrationFields?' + query;
    this.get(url, callback);
  };
// masterIntegrations
PipelinesAdapter.prototype.getMasterIntegrations =
  function (query, callback) {
    var url = '/masterIntegrations?' + query;
    this.get(url, callback);
  };

// nodeConsoles
PipelinesAdapter.prototype.postNodeConsoles =
  function (json, callback) {
    var url = '/nodeConsoles';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.deleteNodeConsolesByNodeId =
  function (nodeId, callback) {
    var url = '/nodes/' + nodeId + '/nodeConsoles';
    this.delete(url, callback);
  };

// nodeStats
PipelinesAdapter.prototype.getNodeStats =
  function (query, callback) {
    var url = '/nodeStats?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deleteNodeStatsByNodeId =
  function (nodeId, callback) {
    var url = '/nodes/' + nodeId + '/nodeStats';
    this.delete(url, callback);
  };

// nodePools
PipelinesAdapter.prototype.getNodePools =
  function (query, callback) {
    var url = '/nodePools?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.postNodePool =
  function (json, callback) {
    var url = '/nodePools';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.postNodes =
  function (json, callback) {
    var url = '/nodes';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.putNodePoolById =
  function (nodePoolId, json, callback) {
    var url = '/nodePools/' + nodePoolId;
    this.put(url, json, callback);
  };

PipelinesAdapter.prototype.deleteNodePoolById =
  function (nodePoolId, callback) {
    var url = '/nodePools/' + nodePoolId;
    this.delete(url, callback);
  };

// nodes
PipelinesAdapter.prototype.getNodeById =
  function (nodeId, callback) {
    var url = '/nodes/' + nodeId;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.deleteNodeById =
  function (nodeId, callback) {
    var url = '/nodes/' + nodeId;
    this.delete(url, callback);
  };
PipelinesAdapter.prototype.putNodeById =
  function (nodeId, json, callback) {
    var url = '/nodes/' + nodeId;
    this.put(url, json, callback);
  };
PipelinesAdapter.prototype.getNodes =
  function (query, callback) {
    var url = '/nodes?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.updateNodeStatistics =
  function (callback) {
    var url = '/nodes/updateStatistics';
    this.post(url, {}, callback);
  };

// nodeScripts
PipelinesAdapter.prototype.getNodeScripts =
  function (query, callback) {
    var url = '/passthrough/nodes/scripts?' + query;
    this.get(url, callback);
  };

//providers
PipelinesAdapter.prototype.getProviders =
  function (query, callback) {
    var url = '/providers?' + query;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.getProviderById =
  function (providerId, callback) {
    var url = '/providers/' + providerId;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.postProvider =
  function (json, callback) {
    var url = '/providers';
    this.post(url, json, callback);
  };

// identities
PipelinesAdapter.prototype.getIdentities =
  function (query, callback) {
    var url = '/identities?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.getIdentityById =
  function (identityId, callback) {
    var url = '/identities/' + identityId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.postIdentity =
  function (json, callback) {
    var url = '/identities';
    this.post(url, json, callback);
  };

// identityTokens
PipelinesAdapter.prototype.getIdentityTokens =
  function (query, callback) {
    var url = '/identityTokens?' + query;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.postIdentityToken =
  function (json, callback) {
    var url = '/identityTokens';
    this.post(url, json, callback);
  };
PipelinesAdapter.prototype.deleteIdentityTokenById =
  function (identityTokenId, query, callback) {
    var url = '/identityTokens/' + identityTokenId + '?' + query;
    this.delete(url, callback);
  };

// identityRoles
PipelinesAdapter.prototype.getIdentityRoles =
  function (query, callback) {
    var url = '/identityRoles?' + query;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.postIdentityRole =
  function (json, callback) {
    var url = '/identityRoles';
    this.post(url, json, callback);
  };
PipelinesAdapter.prototype.deleteIdentityRole =
  function (identityRoleId, callback) {
    var url = '/identityRoles/' + identityRoleId;
    this.delete(url, callback);
  };

// projectIntegrations
PipelinesAdapter.prototype.getProjectIntegrationById =
function (projectIntegrationId, callback) {
  var url = '/projectIntegrations/' + projectIntegrationId;
  this.get(url, callback);
};
PipelinesAdapter.prototype.getProjectIntegrations =
function (query, callback) {
  var url = '/projectIntegrations?' + query;
  this.get(url, callback);
};

PipelinesAdapter.prototype.postProjectIntegrations =
function (body, callback) {
  var url = '/projectIntegrations/';
  this.post(url, body, callback);
};
PipelinesAdapter.prototype.putProjectIntegrationById =
function (projectIntegrationId, json, callback) {
  var url = '/projectIntegrations/' + projectIntegrationId;
  this.put(url, json, callback);
};
PipelinesAdapter.prototype.deleteProjectIntegrationById =
function (projectIntegrationId, callback) {
  var url = '/projectIntegrations/' + projectIntegrationId;
  this.delete(url, callback);
};
PipelinesAdapter.prototype.validateRepositoryOwnerToken =
function (id, query, callback) {
  var url = util.format(
    '/projectIntegrations/%s/validateRepositoryOwnerToken?%s', id, query
  );
  this.get(url, callback);
};

// subscriptionIntegrations
PipelinesAdapter.prototype.getSubscriptionIntegrationById =
  function (subscriptionIntegrationId, callback) {
    var url = '/subscriptionIntegrations/' + subscriptionIntegrationId;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.getSubscriptionIntegrationDependencies =
  function (subscriptionIntegrationId, callback) {
    var url = '/subscriptionIntegrations/' + subscriptionIntegrationId +
      '/dependencies';
    this.get(url, callback);
  };
PipelinesAdapter.prototype.getSubscriptionIntegrations =
  function (query, callback) {
    var url = '/subscriptionIntegrations?' + query;
    this.get(url, callback);
  };
PipelinesAdapter.prototype.putSubscriptionIntegrationById =
  function (subscriptionIntegrationId, json, callback) {
    var url = '/subscriptionIntegrations/' + subscriptionIntegrationId;
    this.put(url, json, callback);
  };
PipelinesAdapter.prototype.deleteSubscriptionIntegrationById =
  function (subscriptionIntegrationId, callback) {
    var url = '/subscriptionIntegrations/' + subscriptionIntegrationId;
    this.delete(url, callback);
  };

//system Codes
PipelinesAdapter.prototype.getSystemCodes =
  function (callback) {
    this.get(
      util.format('/systemCodes'),
      callback
    );
  };

// systemServices
PipelinesAdapter.prototype.getSystemServices =
  function (query, callback) {
    var url = '/systemServices?' + query;
    this.get(url, callback);
  };

// systemServiceInstances
PipelinesAdapter.prototype.getSystemServiceInstances =
  function (query, callback) {
    var url = '/systemServiceInstances?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.putSystemServiceInstanceById =
  function (systemServiceInstanceId, json, callback) {
    var url = '/systemServiceInstances/' + systemServiceInstanceId;
    this.put(url, json, callback);
  };

// workflowControllers
PipelinesAdapter.prototype.getWorkflowControllers =
  function (query, callback) {
    this.get(
      util.format('/workflowControllers?%s', query),
      callback
    );
  };

PipelinesAdapter.prototype.postWorkflowController =
  function (json, callback) {
    var url = '/workflowControllers';
    this.post(url, json, callback);
  };

// systemServiceInstanceStats
PipelinesAdapter.prototype.postSystemServiceInstanceStats =
  function (body, callback) {
    var url = '/systemServiceInstanceStats';
    this.post(url, body, callback);
  };

// projectPermissions
PipelinesAdapter.prototype.postProjectPermissions =
  function (json, callback) {
    var url = '/projectPermissions';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.getProjectPermissions =
  function (query, callback) {
    var url = '/projectPermissions?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deleteProjectPermissionsById =
  function (projectPermissionsId, query, callback) {
    var url = '/projectPermissions/' + projectPermissionsId + '?' + query;
    this.delete(url, callback);
  };

// vortex
PipelinesAdapter.prototype.postToVortex = function (where, message, callback) {
  var json = {
    where: where,
    payload: message
  };
  var url = '/vortex';
  this.post(url, json, callback);
};

// webhooks
PipelinesAdapter.prototype.postWebhook = function (json, callback) {
  var url = '/webhooks';
  this.post(url, json, callback);
};

PipelinesAdapter.prototype.putWebhookById = function (id, json, callback) {
  var url = '/webhooks/'+id;
  this.put(url, json, callback);
};

PipelinesAdapter.prototype.getWebhooks = function (query, callback) {
  var url = '/webhooks?'+query;
  this.get(url, callback);
};

PipelinesAdapter.prototype.deleteWebhooksByHookId =
  function (hookId, query, callback) {
    var url = '/hooks/' + hookId + '/webhooks?' + query;
    this.delete(url, callback);
  };

// messages
PipelinesAdapter.prototype.getBuildPlaneMessages =
  function (query, callback) {
    var url = '/buildPlaneMessages?' + query;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.deleteMessageById =
  function (messageId, callback) {
    var url = '/buildPlaneMessages/' + messageId;
    this.deleteWithBody(url, {}, callback);
  };

PipelinesAdapter.prototype.postMessage = 
  function (json, callback) {
    var url = '/messages';
    this.post(url, json, callback);
  };
  
PipelinesAdapter.prototype.getMessageById =
  function (messageId, callback) {
    var url = '/messages/' + messageId;
    this.get(url, callback);
  };

PipelinesAdapter.prototype.putMessageById =
  function (stepId, json, callback) {
    var url = '/messages/' + stepId;
    this.put(url, json, callback);
  };
  
PipelinesAdapter.prototype.pollMessage =
  function (nodePoolId, json, callback) {
    var url = '/nodePools/' + nodePoolId + '/messages/poll';
    this.post(url, json, callback);
  };

PipelinesAdapter.prototype.getLocks =
  function (query, callback) {
    this.get(
      '/locks?'+query,
      callback
    );
  };

PipelinesAdapter.prototype.deleteLockById =
  function (lockId, callback) {
    this.delete(
      '/locks/'+lockId,
      callback
    );
  };