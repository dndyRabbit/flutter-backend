const router = require("express").Router();
const articleCtrl = require("../controllers/article.controller");

router.post("/postArticle", articleCtrl.postArticle);
router.get("/getAllArticle", articleCtrl.getAllArticle);
router.get("/getArticle/:id", articleCtrl.getArticle);
router.patch("/patchArticle/:id", articleCtrl.patchArticle);
router.delete("/deleteArticle/:id", articleCtrl.deleteArticle);
router.delete("/deleteAllArticles", articleCtrl.deleteAllArticles);

module.exports = router;
