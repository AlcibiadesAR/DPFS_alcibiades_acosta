const productDB = require("../../data/products.json");

let Home = {
  pageHome: (req, res, next) => {
    const offerProducts = productDB
      .filter((product) => product.Offer === true)
      .slice(0, 4);
    const kidsWatches = productDB
      .filter((product) => product.Category === "Niños")
      .slice(0, 4);

    return res.render("index", {
      title: "EleganceTimeShop",
      headerClass: "header-transparent",
      offerProducts: offerProducts,
      kidsWatches: kidsWatches,
    });
  },
};

module.exports = Home;
