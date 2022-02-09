'use strict';

/**
 * presentation service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::presentation.presentation');
