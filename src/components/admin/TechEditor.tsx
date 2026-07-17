"use client";

import { useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";


export default function TechEditor({
    projectId,
    currentTech,
    availableTech,
}: {
    projectId: string;
    currentTech: string[];
    availableTech: string[];
}) {

    const [selectedTech, setSelectedTech] = useState(
        currentTech,
    );


    const [newTech, setNewTech] = useState("");



    function addTech() {

        if (
            newTech &&
            !selectedTech.includes(newTech)
        ) {
            setSelectedTech([
                ...selectedTech,
                newTech,
            ]);
        }

        setNewTech("");
    }


    function removeTech(tech: string) {

        setSelectedTech(
            selectedTech.filter(
                t => t !== tech,
            ),
        );
    }


    return (
        <form
            action="/admin/api/projects/update-tech"
            method="POST"
            className="space-y-4"
        >

            <input
                type="hidden"
                name="projectId"
                value={projectId}
            />


            {selectedTech.map(tech => (
                <input
                    key={tech}
                    type="hidden"
                    name="tech"
                    value={tech}
                />
            ))}


            <div className="flex flex-wrap gap-2">

                {selectedTech.map(tech => (
                    <div
                        key={tech}
                        className="flex items-center gap-2 rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1 text-sm text-neutral-300"
                    >

                        {tech}

                        <button
                            type="button"
                            onClick={() => removeTech(tech)}
                            className="text-neutral-500 hover:text-red-400 cursor-pointer"
                        >
                            <Trash2 size={13}/>
                        </button>

                    </div>
                ))}


                {selectedTech.length === 0 && (
                    <span className="text-sm text-neutral-500 italic">
                        Geen technieken geselecteerd.
                    </span>
                )}

            </div>



            <div className="flex gap-2">

                <select
                    value={newTech}
                    onChange={(e) =>
                        setNewTech(e.target.value)
                    }
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-300"
                >

                    <option value="">
                        Kies technologie...
                    </option>


                    {availableTech
                        .filter(
                            tech =>
                                !selectedTech.includes(tech),
                        )
                        .map(tech => (
                            <option
                                key={tech}
                                value={tech}
                            >
                                {tech}
                            </option>
                        ))
                    }

                </select>


                <button
                    type="button"
                    onClick={addTech}
                    className="rounded-md border border-neutral-800 px-3 text-neutral-300 hover:bg-neutral-900 cursor-pointer"
                >
                    <Plus size={15}/>
                </button>

            </div>



            <div className="flex justify-end">

                <button
                    type="submit"
                    className="rounded-full bg-purple-700 px-5 py-2.5 text-white hover:bg-purple-600 cursor-pointer inline-flex items-center gap-2"
                >
                    <Save size={14} />
                    Opslaan
                </button>

            </div>

        </form>
    );
}