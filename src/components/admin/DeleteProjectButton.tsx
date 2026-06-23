"use client";

import { FormEvent } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteProjectButton({
    projectId,
    projectTitle
}: {
    projectId: string;
    projectTitle: string;
}) {

    function confirmDelete(event: FormEvent<HTMLFormElement>) {
        const confirmed = window.confirm(
            `Weet je zeker dat je "${projectTitle}" wilt verwijderen? Dit verwijdert de hele projectmap.`
        );

        if (!confirmed) {
            event.preventDefault();
        }
    }

    return (
        <form
            action="/admin/api/projects/delete-project"
            method="POST"
            onSubmit={confirmDelete}
        >
            <input
                type="hidden"
                name="projectId"
                value={projectId}
            />

            <button
                type="submit"
                aria-label={`${projectTitle} verwijderen`}
                title="Project verwijderen"
                className="rounded-md border border-neutral-800 p-2 text-neutral-500 transition hover:border-red-900/70 hover:bg-red-950/30 hover:text-red-400 cursor-pointer"
            >
                <Trash2 size={16} />
            </button>
        </form>
    );
}