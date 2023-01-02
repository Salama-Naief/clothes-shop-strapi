"use strict";

/**
 *  order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    const response = await strapi.entityService.create("api::order.order", {
      data: data,
    });

    return { response };
  },
}));
