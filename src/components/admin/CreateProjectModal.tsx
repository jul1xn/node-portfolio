"use client";

import { FormEvent, useState } from "react";
import { Plus, Save, X } from "lucide-react";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default function CreateProjectModal() {

    const [open, setOpen] = useState(false);
    const [internalName, setInternalName] = useState("");
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [error, setError] = useState("");

    const isValid =
        slugPattern.test(internalName) &&
        title.trim().length > 0 &&
        shortDescription.trim().length > 0;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        if (!isValid) {
            event.preventDefault();
            setError("Vul alle velden in en gebruik voor de interne naam alleen kleine letters, cijfers en streepjes.");
        }
    }

    function closeModal() {
        setOpen(false);
        setError("");
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-purple-700 px-4 py-2 text-sm text-white transition hover:bg-purple-600 cursor-pointer"
            >
                <Plus size={16} />
                Project toevoegen
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-lg rounded-md border border-neutral-800 bg-neutral-950 p-5 shadow-xl">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-medium text-white">
                                    Nieuw project
                                </h3>

                                <p className="text-sm text-neutral-400">
                                    Maak een nieuwe projectmap met basisinformatie.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Modal sluiten"
                                className="rounded-md border border-neutral-800 p-2 text-neutral-400 transition hover:bg-neutral-900 hover:text-white cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <form
                            action="/admin/api/projects/create-project"
                            method="POST"
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="internalName"
                                    className="mb-1 block text-sm text-neutral-300"
                                >
                                    Interne naam
                                </label>

                                <input
                                    id="internalName"
                                    name="internalName"
                                    type="text"
                                    required
                                    pattern="[a-z0-9]+(-[a-z0-9]+)*"
                                    value={internalName}
                                    onChange={(event) => setInternalName(event.target.value)}
                                    placeholder="mijn-nieuwe-project"
                                    className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:border-neutral-700 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-1 block text-sm text-neutral-300"
                                >
                                    Titel
                                </label>

                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:border-neutral-700 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="shortDescription"
                                    className="mb-1 block text-sm text-neutral-300"
                                >
                                    Korte beschrijving
                                </label>

                                <textarea
                                    id="shortDescription"
                                    name="shortDescription"
                                    required
                                    rows={3}
                                    value={shortDescription}
                                    onChange={(event) => setShortDescription(event.target.value)}
                                    className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:border-neutral-700 focus:outline-none"
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-400">
                                    {error}
                                </p>
                            )}

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-md border border-neutral-800 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-900 cursor-pointer"
                                >
                                    Annuleren
                                </button>

                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="inline-flex items-center gap-2 rounded-full bg-purple-700 px-5 py-2 text-sm text-white transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500 cursor-pointer"
                                >
                                    <Save size={14} />
                                    Aanmaken
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
