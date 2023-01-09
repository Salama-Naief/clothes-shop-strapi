"use strict";

/**
 *  order controller
 */

async function productOrder(item) {
  console.log("itemsss=>>", item);
  const orderProductRes = await strapi.entityService.create(
    "api::order-product.order-product",
    {
      data: {
        product: parseInt(item.id),
        quantity: parseInt(item.quantity),
        name: item.name,
      },
    }
  );
  return orderProductRes;
}
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    console.log("data ctx==> ", data);
    const productsId = [];
    for (let i = 0; i < data.productsData.length; i++) {
      console.log("ii===>", i);
      if (data.productsData[i]) {
        const dd = await productOrder(data.productsData[i]);
        productsId.push(dd.id);
      }
    }
    //const dd = await productOrder({ id: 2, quantity: 6 });
    console.log("productsId==> ", productsId);
    const response = await strapi.entityService.create("api::order.order", {
      data: { ...data, orderProducts: productsId },
    });

    return { response };
  },
}));
