import { useEffect, useMemo, useState } from "react";
import { University } from "../../types/University";
import { UniversityTableRow } from "./UniversityTableRow";

interface UniversityTableProps {
    universities: University[],
    page: number,
    pageLength: number
}

export function UniversityTable({ universities, page, pageLength }: UniversityTableProps) {
    const lowerLimit = (page - 1) * pageLength;
    const upperLimit = page * pageLength;

    return <>
        <table className="university-table">
            <thead className="university-table-head">
                <tr>
                    <th scope="col" className="university-table-head-cell">
                        Universidade
                    </th>
                    <th scope="col" className="university-table-head-cell">
                        Sigla
                    </th>
                    <th scope="col" className="university-table-head-cell">
                        Região
                    </th>
                    <th scope="col" className="university-table-head-cell">
                        Estado
                    </th>
                    <th scope="col" className="university-table-head-cell">
                        Local
                    </th>
                </tr>
            </thead>
            <tbody className="university-table-body">
                {universities.map(({ Name: name, Initial: initials, Region: region, RegionType: regionType, State: state }, index) => index >= lowerLimit && index < upperLimit ?
                    <tr className="university-table-body-row" key={index}>
                        <td scope="col" className="university-table-body-cell">
                            {name}
                        </td>
                        <td scope="col" className="university-table-body-cell">
                            {initials}
                        </td>
                        <td scope="col" className="university-table-body-cell">
                            {region.replace(/\_/g, " ")}
                        </td>
                        <td scope="col" className="university-table-body-cell">
                            {state}
                        </td>
                        <td scope="col" className="university-table-body-cell">
                            {regionType}
                        </td>
                    </tr>
                : null)}
            </tbody>
        </table>
    </>
}