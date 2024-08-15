let  Home = {
  pageHome: function (req, res, next) {
    return res.render("index", { title: "EleganceTimeShop"});
}
}

module.exports = Home;