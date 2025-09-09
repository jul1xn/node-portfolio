const fs = require('fs');
const connection = require('./database');
const { connect } = require('http2');

function getAllProjectsByPage(pageIndex) {
    return new Promise((resolve, reject) => {
        const startingIndex = (pageIndex - 1) * 30;
        const endingIndex = startingIndex + 30;
        connection.query('SELECT internal_name FROM projects LIMIT ?,?', [startingIndex, endingIndex], (error, results) => {
            if (error) {
                console.error('Error fetching projects:', error);
                return reject(error);
            }

            resolve(results.map(row => row.internal_name));
        });
    });
}

function getAllProjectsByOffset(startingIndex, endingIndex) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT internal_name FROM projects LIMIT ?,?', [startingIndex, endingIndex], (error, results) => {
            if (error) {
                console.error('Error fetching projects:', error);
                return reject(error);
            }

            resolve(results.map(row => row.internal_name));
        });
    });
}

function getProject(projectName) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM projects WHERE internal_name = ?', [projectName], (error, results) => {
            if (error) {
                console.error('Error fetching project:', error);
                return reject(error);
            }
            const output = results[0]; // Use const here!
            if (!output) {
                return reject('Project not found');
            }

            // Get links
            connection.query('SELECT name, url FROM projects_links WHERE target_project = ?', [output.id], (linkError, linkResults) => {
                if (linkError) {
                    console.error('Error fetching project links:', linkError);
                    return reject(linkError);
                }
                output.links = linkResults;

                // Get images
                connection.query('SELECT src, description FROM projects_images WHERE target_project = ?', [output.id], (imageError, imageResults) => {
                    if (imageError) {
                        console.error('Error fetching project images:', imageError);
                        return reject(imageError);
                    }
                    output.images = imageResults;

                    // Get technologies
                    connection.query('SELECT name FROM projects_languages WHERE target_project = ?', [output.id], (techError, techResults) => {
                        if (techError) {
                            console.error('Error fetching project languages:', techError);
                            return reject(techError);
                        }
                        output.technologies = techResults.map(row => row.name);

                        resolve(output);
                    });
                });
            });
        });
    });
}

function getProjectShort(projectName) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id, internal_name, name, short_description, thumbnail FROM projects WHERE internal_name = ?', [projectName], (error, results) => {
            if (error) {
                console.error('Error fetching project:', error);
                return reject(error);
            }
            const output = results[0];
            if (!output) {
                return reject('Project not found');
            }

            // Get technologies
            connection.query('SELECT name FROM projects_languages WHERE target_project = ?', [output.id], (techError, techResults) => {
                if (techError) {
                    console.error('Error fetching project languages:', techError);
                    return reject(techError);
                }
                output.technologies = techResults.map(row => row.name);

                resolve(output);
            });
        });
    });
}

module.exports = {
    getProject,
    getProjectShort,
    getAllProjectsByPage,
    getAllProjectsByOffset
};