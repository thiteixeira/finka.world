const express = require('express');
const router = express.Router();
const Video = require('../models/video');
// const { isLoggedIn } = require('../middleware');

/* GET content page - Show all videos */
router.get('/', (req, res, next) => {
  Video.find({}, (err, videos) => {
    if (err) {
      console.error(err);
    } else {
      res.render('content/content', {
        title: 'Browse Content',
        contents: videos,
      });
    }
  });
});

//
// CREATE - Add new content to DB
//
// router.post('/', (req, res) => {
//   let title = req.body.title;
//   let price = req.body.price;
//   let short_desc = req.body.short_description;
//   let long_desc = req.body.long_description;
//   let category = req.body.category;
//   let profession = req.body.profession;

//   let newContent = {
//     title: title,
//     short_description: short_desc,
//     long_description: long_desc,
//     category: category,
//     profession: profession,
//     price: price,
//   };

//   Video.create(newContent, (err, contents) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect('/content');
//     }
//   });
// });

//
// NEW - show form to create new content
//
// router.get('/new', (req, res) => {
//   res.render('content/new');
// });

//
// SHOW - show more info
//
router.get('/:id', (req, res) => {
  Video.findById(req.params.id).exec((err, content) => {
    if (err) {
      console.log(err);
    } else {
      res.render('content/show', { content: content });
    }
  });
});

module.exports = router;
