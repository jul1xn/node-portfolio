"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function ImageUploadForm({
    projectId
}: {
    projectId: string;
}) {

    const [fileName, setFileName] = useState<string>("");


    return (
        <form
            action="/admin/api/projects/upload-image"
            method="POST"
            encType="multipart/form-data"
            className="space-y-4"
        >

            <input
                type="hidden"
                name="projectId"
                value={projectId}
            />


            <div className="border border-dashed border-neutral-800 hover:border-neutral-700 rounded-md p-6 text-center cursor-pointer transition group">

                <input
                    type="file"
                    name="image"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    required
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                            setFileName(file.name);
                        } else {
                            setFileName("");
                        }
                    }}
                />


                <label
                    htmlFor="file-upload"
                    className="cursor-pointer block"
                >

                    <Upload
                        size={20}
                        className="mx-auto mb-2 text-neutral-500 group-hover:text-neutral-400"
                    />


                    {fileName ? (
                        <>
                            <span className="text-sm text-green-400 block">
                                Bestand geselecteerd
                            </span>

                            <span className="text-xs text-neutral-400 block mt-1 truncate">
                                {fileName}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-sm text-neutral-400 block">
                                Klik om een afbeelding te kiezen
                            </span>

                            <span className="text-xs text-neutral-600 block mt-1">
                                PNG of JPG, maximaal 5 MB
                            </span>
                        </>
                    )}

                </label>

            </div>


            <div>
                <label
                    htmlFor="image-description"
                    className="text-sm text-neutral-400 block mb-1"
                >
                    Beschrijving (optioneel)
                </label>

                <input
                    type="text"
                    name="description"
                    id="image-description"
                    placeholder="Bijv. Homepage screenshot"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-neutral-700"
                />
            </div>


            <button
                type="submit"
                className="w-full cursor-pointer rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-300 transition hover:bg-neutral-900"
            >
                Afbeelding uploaden
            </button>

        </form>
    );
}