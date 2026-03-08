const express = require('express');
const router = express.Router();
const constants = require('../constants');
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    let filter = req.query.filter || null;
    if (filter === "C") { filter = "C#"; } // special case for C#
    return await res.render('projecten/projecten', { title: 'Projecten', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME, available_tech: constants.PROJECTEN_AVAILABLE_TECH, current_page: page, filter: filter });
});

router.get('/:project', async (req, res) => {
    const projectData = await getProject(req.params.project);
    return await res.render('projecten/project', { title: projectData.title, links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME, project: req.params.project, data: projectData });
});

router.get('/api/all', async (req, res) => {
    let filter = req.query.filter || null; // string
    if (filter === "C") { filter = "C#"; } // special case for C#
    const limit = parseInt(req.query.limit) || constants.PROJECTEN_PAGE_AANTAL;
    const page = parseInt(req.query.page) - 1 || 0;
    const offset = page * limit;

    const dirPath = path.join(__dirname, "..", "projecten");

    try {
        // 1. Read all project folders
        const folders = await fs.readdir(dirPath)
            .filter(async name => await fs.stat(path.join(dirPath, name)).isDirectory());

        // 2. Load each info.json and create objects
        let projects = folders.map(async folder => {
            try {
                const project = await getProject(folder);
                return { folder, ...project }; // include folder name too
            } catch (err) {
                console.error(`Skipping project '${folder}':`, err.message);
                return null; // skip broken projects
            }
        }).filter(Boolean); // remove nulls

        // 3. Apply filter by tech (case-insensitive)
        if (filter) {
            const filterLower = filter.toLowerCase();
            projects = projects.filter(p => 
                p.tech && p.tech.some(t => t.toLowerCase() === filterLower)
            );
        }

        // 4. Total count BEFORE pagination
        const total = projects.length;

        // 5. Apply limit + offset
        const paginated = projects.slice(offset, offset + limit);

        // 6. Return API response
        return await res.json(paginated.map(p => p.folder));

    } catch (err) {
        console.error(err);
        return await res.status(500).json({ error: "Kon de projecten niet ophalen!" });
    }
});

router.get('/api/carousel', async (req, res) => {
    const projectenRoot = path.join(__dirname, "..", "projecten");

    try {
        // 1. Get all project folders
        const projectFolders = await fs.readdir(projectenRoot)
            .filter(async folder => await fs.stat(path.join(projectenRoot, folder)).isDirectory());

        // 2. Collect thumbnails from info.json
        let thumbnails = [];

        projectFolders.forEach(async folder => {
            try {
                const projectData = await getProject(folder); // your existing function
                if (projectData.thumbnail) {
                    // prepend project folder path to thumbnail
                    thumbnails.push(`/projecten/api/${folder}/${projectData.thumbnail}`);
                }
            } catch (err) {
                console.error(`Skipping project '${folder}' for carousel:`, err.message);
            }
        });

        // 3. Shuffle array
        for (let i = thumbnails.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [thumbnails[i], thumbnails[j]] = [thumbnails[j], thumbnails[i]];
        }

        // 4. Take up to 5 thumbnails
        const result = thumbnails.slice(0, 5);

        return await res.json(result);

    } catch (err) {
        console.error("Carousel error:", err);
        return await res.status(500).json({ error: "Kon carousel afbeeldingen niet ophalen!" });
    }
});

router.get('/api/homepage', async (req, res) => {
    return await res.json(constants.HOMEPAGE_PROJECTEN); // Altijd dezelfde projecten
});

router.get('/api/pagination', async (req, res) => {
    return await res.json({ itemsPerPage: constants.PROJECTEN_PAGE_AANTAL });
});

router.get('/api/:project', async (req, res) => {
    return await res.json(getProject(req.params.project));
});

router.get('/api/:project/:file', async (req, res) => {
    const projectenRoot = path.join(__dirname, "..", "projecten", req.params.project);
    const requestedPath = path.join(projectenRoot, req.params.file);

    const normalized = path.normalize(requestedPath);
    if (!normalized.startsWith(projectenRoot)) {
        return res.status(400).json({ error: "Invalid path." });
    }

    try {
        if (!fs.existsSync(normalized)) {
            return await res.status(404).json({ error: "File not found." });
        }

        return await res.sendFile(normalized);

    } catch (err) {
        console.error(err);
        return await res.status(500).json({ error: "Kon het project niet ophalen!" });
    }
});

async function getProject(projectName) {
    const dirPath = path.join(__dirname, "..", "projecten", projectName, "info.json");

    try {
        if (!fs.existsSync(dirPath)) {
            throw new Error("Project bestand 'info.json' niet gevonden!");
        }

        const data = await fs.readFile(dirPath, 'utf8');
        const arr = JSON.parse(data);

        if (!Array.isArray(arr) || arr.length === 0) {
            throw new Error("info.json heeft geen projectobject!");
        }

        return arr[0];

    } catch (err) {
        throw err;
    }
}


module.exports = router;