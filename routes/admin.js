const express = require('express');
const router = express.Router();
const secrets = require('../secret');
const connection = require('../database');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/upload_project')
    .get((req, res) => {
        const { key } = req.query;
        if (key !== secrets.getAdminKey()) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        return res.render('admin/upload_project', {key: key});
    })
    .post(upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'long_description', maxCount: 1 },
        { name: 'images[]' }
    ]), (req, res) => {
        const {
          key = "",
          internal_name = "",
          name = "",
          short_description = "",
          download_link = "",
          languages = "",
          link_names = "",
          link_urls = "",
          image_descriptions = ""
        } = req.body;
        if (key !== secrets.getAdminKey()) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const parentDirectory = `./projecten/${internal_name}`;
        if (!fs.existsSync(parentDirectory)){
            fs.mkdirSync(parentDirectory);
        }

        if (req.files['images[]']) {
            req.files['images[]'].forEach(file => {
                const newPath = `${parentDirectory}/${file.originalname}`;
                fs.renameSync(file.path, newPath);
            });
        }

        let longDescriptionFileName = "";
        let thumbnailFileName = "";

        if (req.files['long_description'] && req.files['long_description'][0]) {
            const file = req.files['long_description'][0];
            longDescriptionFileName = 'description.' + file.originalname.split('.')[1];
            const newPath = `${parentDirectory}/${longDescriptionFileName}`;
            fs.renameSync(file.path, newPath);
        }

        if (req.files['thumbnail'] && req.files['thumbnail'][0]) {
            const file = req.files['thumbnail'][0];
            thumbnailFileName = 'thumbnail.' + file.originalname.split('.')[1];
            const newPath = `${parentDirectory}/${thumbnailFileName}`;
            fs.renameSync(file.path, newPath);
        }

        connection.query('INSERT INTO `projects` (`internal_name`, `name`, `short_description`, `long_description`, `thumbnail`, `download_link`) VALUES (?, ?, ?, ?, ?, ?)',
            [internal_name, name, short_description, longDescriptionFileName, thumbnailFileName, download_link || null],
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });
                }
                const projectId = results.insertId;
                if (languages) {
                    const langs = Array.isArray(languages) ? languages : [languages];
                    langs.forEach(lang => {
                        connection.query('INSERT INTO `projects_languages` (`target_project`, `name`) VALUES (?, ?)', [projectId, lang], (langErr) => {
                            if (langErr) {
                                console.error(langErr);
                            }
                        });
                    });
                }

                if (link_names && link_urls) {
                    const names = Array.isArray(link_names) ? link_names : [link_names];
                    const urls = Array.isArray(link_urls) ? link_urls : [link_urls];
                    names.forEach((linkName, index) => {
                        const linkUrl = urls[index] || '';
                        connection.query('INSERT INTO `projects_links` (`target_project`, `name`, `url`) VALUES (?, ?, ?)', [projectId, linkName, linkUrl], (linkErr) => {
                            if (linkErr) {
                                console.error(linkErr);
                            }
                        });
                    });
                }

                if (req.files['images[]']) {
                    req.files['images[]'].forEach((file, index) => {
                        const description = Array.isArray(image_descriptions) ? (image_descriptions[index] || '') : (index === 0 ? image_descriptions : '');
                        connection.query('INSERT INTO `projects_images` (`target_project`, `src`, `description`) VALUES (?, ?, ?)', [projectId, file.originalname, description], (imgErr) => {
                            if (imgErr) {
                                console.error(imgErr);
                            }
                        });
                    });
                }
            });

        return res.send('Not implemented yet');
    });

module.exports = router;