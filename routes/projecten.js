const express = require('express');
const router = express.Router();
const config = require('../config');
const fs = require('fs/promises'); // ✅ promises versie
const path = require('path');

// Helper: check of een pad een directory is
async function isDirectory(dirPath) {
    try {
        const stats = await fs.stat(dirPath);
        return stats.isDirectory();
    } catch {
        return false;
    }
}

// GET /projecten
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    let filter = req.query.filter || null;
    if (filter === "C") filter = "C#"; // special case

    return res.render('projecten/projecten', {
        title: 'Projecten',
        current_page: page,
        filter: filter
    });
});

// GET /projecten/:project
router.get('/:project', async (req, res, next) => {
    try {
        const projectData = await getProject(req.params.project);
        return res.render('projecten/project', {
            title: projectData.title,
            project: req.params.project,
            data: projectData
        });
    } catch (err) {
        next(err);
    }
});

// GET /projecten/api/all
router.get('/api/all', async (req, res) => {
    let filter = req.query.filter || null;
    if (filter === "C") filter = "C#";

    const limit = parseInt(req.query.limit) || config.PROJECTEN_PAGE_AANTAL;
    const page = (parseInt(req.query.page) - 1) || 0;
    const offset = page * limit;

    const dirPath = path.join(__dirname, "..", "projecten");

    try {
        // 1. Read all project folders
        let allNames = await fs.readdir(dirPath);
        let folders = [];
        for (const name of allNames) {
            const fullPath = path.join(dirPath, name);
            if (await isDirectory(fullPath)) folders.push(name);
        }

        // 2. Load each info.json
        let projects = [];
        for (const folder of folders) {
            try {
                const project = await getProject(folder);
                projects.push({ folder, ...project }); // include folder name too
            } catch (err) {
                console.error(`Skipping project '${folder}':`, err.message);
            }
        }

        // 3. Apply filter
        if (filter) {
            const filterLower = filter.toLowerCase();
            projects = projects.filter(p => p.tech && p.tech.some(t => t.toLowerCase() === filterLower));
        }

        // 4. Sort alphabetically by project title (case-insensitive)
        projects.sort((a, b) => a.title.localeCompare(b.title, 'nl', { sensitivity: 'base' }));

        // 5. Paginate
        const paginated = projects.slice(offset, offset + limit);

        return res.json(paginated.map(p => p.folder));

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Kon de projecten niet ophalen!" });
    }
});

// GET /projecten/api/carousel
router.get('/api/carousel', async (req, res) => {
    const projectenRoot = path.join(__dirname, "..", "projecten");

    try {
        const allNames = await fs.readdir(projectenRoot);
        let folders = [];
        for (const name of allNames) {
            if (await isDirectory(path.join(projectenRoot, name))) folders.push(name);
        }

        // 2. Collect thumbnails
        const thumbnails = [];
        for (const folder of folders) {
            try {
                const data = await getProject(folder);
                if (data.thumbnail) {
                    thumbnails.push(`/projecten/api/${folder}/${data.thumbnail}`);
                }
            } catch (err) {
                console.error(`Skipping project '${folder}' for carousel:`, err.message);
            }
        }

        // Shuffle
        for (let i = thumbnails.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [thumbnails[i], thumbnails[j]] = [thumbnails[j], thumbnails[i]];
        }

        return res.json(thumbnails.slice(0, 5));

    } catch (err) {
        console.error("Carousel error:", err);
        return res.status(500).json({ error: "Kon carousel afbeeldingen niet ophalen!" });
    }
});

// GET /projecten/api/homepage
router.get('/api/homepage', async (req, res) => {
    return res.json(config.HOMEPAGE_PROJECTEN);
});

// GET /projecten/api/pagination
router.get('/api/pagination', async (req, res) => {
    return res.json({ itemsPerPage: config.PROJECTEN_PAGE_AANTAL });
});

// GET /projecten/api/:project
router.get('/api/:project', async (req, res) => {
    try {
        const data = await getProject(req.params.project);
        return res.json(data);
    } catch (err) {
        return res.status(404).json({ error: "Project niet gevonden" });
    }
});

// GET /projecten/api/:project/:file
router.get('/api/:project/:file', async (req, res) => {
    const projectenRoot = path.join(__dirname, "..", "projecten", req.params.project);
    const requestedPath = path.join(projectenRoot, req.params.file);
    const normalized = path.normalize(requestedPath);

    if (!normalized.startsWith(projectenRoot)) {
        return res.status(400).json({ error: "Invalid path." });
    }

    try {
        await fs.access(normalized); // check if exists
        return res.sendFile(normalized);
    } catch {
        return res.status(404).json({ error: "File not found." });
    }
});

// Helper: read info.json
async function getProject(projectName) {
    const filePath = path.join(__dirname, "..", "projecten", projectName, "info.json");

    try {
        await fs.access(filePath); // check existence
        const data = await fs.readFile(filePath, 'utf8');
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