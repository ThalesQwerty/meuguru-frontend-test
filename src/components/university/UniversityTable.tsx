import { useEffect, useMemo, useState } from "react";
import { University } from "../../types/University";
import { UniversityTableRow } from "./UniversityTableRow";

interface UniversityTableProps {
    universities: University[]
}

export function UniversityTable({ universities }: UniversityTableProps) {
    const PAGE_LENGTH = 10;

    const [page, setPage] = useState(1);
    const numPages = useMemo(() => Math.ceil(universities.length / PAGE_LENGTH), [universities]);

    const lowerLimit = useMemo(() => (page - 1) * PAGE_LENGTH, [page]);
    const upperLimit = useMemo(() => page * PAGE_LENGTH, [page]);

    useEffect(() => {
        if (page > numPages) setPage(numPages);
        else if (page < 1) setPage(1);
    }, [page]);

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
                    <tr className="university-table-body-row">
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