import type { MetadataRoute } from "next";
import { getAllProjects } from "./projecten/page";
import { url } from "@/utils/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = url; // change this later
    const projects = getAllProjects();
    const projectRoutes = projects.map(project => ({
        url: `${baseUrl}/projecten/${project}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/over-mij`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projecten`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
        ...projectRoutes
    ];
}