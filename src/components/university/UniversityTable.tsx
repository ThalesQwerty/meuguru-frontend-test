import { useEffect, useMemo, useState } from "react";
import { University } from "../../types/University";
import { UniversityTableRow } from "./UniversityTableRow";

interface UniversityTableProps {
    universities: University[],
    page: number,
    pageLength: number
}

type SortingOrder = "asc"|"desc";

interface CurrentSorting {
    field: keyof University,
    order: SortingOrder
}

export function UniversityTable({ universities: data, page, pageLength }: UniversityTableProps) {
    const [universities, setUniversities] = useState([...data]);
    const [currentSorting, setCurrentSorting] = useState<CurrentSorting|null>(null);

    const headerNames: {[key in keyof University]: string} = {
        Name: "Universidade",
        Initial: "Sigla",
        Type: "Tipo",
        Region: "Região",
        State: "Estado",
        RegionType: "Local"
    };

    const lowerLimit = (page - 1) * pageLength;
    const upperLimit = page * pageLength;

    function sortBy(field: keyof University) {
        const order: SortingOrder = currentSorting?.field === field && currentSorting?.order === "asc" ? "desc" : "asc";

        if (order === "asc") setUniversities(universities.sort((a, b) => a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0));
        else setUniversities(universities.sort((a, b) => a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0));

        setCurrentSorting({
            field, order
        });
    }

    return <>
        <table className="university-table">
            <thead className="university-table-head">
                <tr>
                    {Object.keys(headerNames).map(_key => {
                        const key = _key as keyof University;
                        const label = headerNames[key];
                        const active = currentSorting?.field === key;

                        return <th scope="col" className={`university-table-head-cell ${active ? "active" : ""}`} onClick={() => sortBy(key)} key={key} >
                            {active ? currentSorting.order === "asc" ? "^ " : "v " : null}
                            {label}
                        </th>;
                    })}
                </tr>
            </thead>
            <tbody className="university-table-body">
                {universities.map((university, index) => index >= lowerLimit && index < upperLimit ?
                    <tr className="university-table-body-row" key={index}>
                        {Object.keys(headerNames).map(_key => {
                            const key = _key as keyof University;

                            return <td scope="col" className="university-table-body-cell" key={key}>{university[key]}</td>;
                        })}
                    </tr>
                : null)}
            </tbody>
        </table>
    </>
}