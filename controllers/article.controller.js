const Articles = require("../models/article.model");

const articleCtrl = {
  postArticle: async (req, res) => {
    try {
      const body = req.body;

      if (
        body.title == "" ||
        body.location == "" ||
        body.description == "" ||
        body.price == null
      ) {
        return res
          .status(400)
          .json({ msg: "Data tidak boleh ada yang kosong." });
      }

      const articlesSave = new Articles({
        title: body.title,
        location: body.location,
        description: body.description,
        price: body.price,
        pictures: body.pictures,
      });

      articlesSave.save();

      res.json({
        msg: "Article berhasil dibuat.",
        data: articlesSave,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  getAllArticle: async (req, res) => {
    try {
      const articleDatas = await Articles.find();

      if (!articleDatas) {
        return res.status(400).json({ msg: "Tidak ada article." });
      }
      res.json({
        msg: "Berhasil mengambil articles.",
        data: articleDatas,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  getArticle: async (req, res) => {
    try {
      const param = req.params;

      const articleData = await Articles.findOne({ _id: param.id });

      if (!articleData) {
        return res.status(400).json({ msg: "Tidak ada article." });
      }

      res.json({
        msg: "Berhasil mengambil article.",
        data: articleData,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  patchArticle: async (req, res) => {
    try {
      const param = req.params;
      const body = req.body;

      const verify = await Articles.findById({ _id: param.id });

      if (!verify) {
        return res.status(400).json({ msg: "Article tersebut tidak ada." });
      }
      const articleData = await Articles.findOneAndUpdate(
        { _id: param.id },
        {
          title: body.title,
          location: body.location,
          description: body.description,
          price: body.price,
          pictures: body.pictures,
        }
      );

      res.json({
        msg: "Article berhasil di update.",
      });

      console.log(articleData);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  deleteArticle: async (req, res) => {
    try {
      const param = req.params;

      const articleData = await Articles.findByIdAndDelete({ _id: param.id });

      if (!articleData) {
        return res.status(400).json({ msg: "Article tersebut tidak ada." });
      }

      res.json({
        msg: "Article berhasil di hapus.",
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  deleteAllArticles: async (req, res) => {
    try {
      await Articles.deleteMany();

      res.json({
        msg: "Semua articles berhasil di hapus.",
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
};

module.exports = articleCtrl;
