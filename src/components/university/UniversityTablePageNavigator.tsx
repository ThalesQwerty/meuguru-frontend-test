import { useEffect, useMemo, useState } from "react";
import { University } from "../../types/University";
import { UniversityTableRow } from "./UniversityTableRow";

interface UniversityTablePageNavigatorProps {
    initialPage: number
    numPages: number
    onChange: (params: { newPage: number }) => void
}

export function UniversityTablePageNavigator({ initialPage = 1, numPages, onChange }: UniversityTablePageNavigatorProps) {
    const MAX_NUMBER_BUTTONS = 9;

    const [page, setPage] = useState(initialPage);

    const pageArray = [page];
    while (pageArray.length < MAX_NUMBER_BUTTONS) {
        const right = pageArray[pageArray.length - 1] + 1;
        const left = pageArray[0] - 1;
        if (right <= numPages) pageArray.push(right);
        if (left >= 1) pageArray.unshift(left);
    }

    useEffect(() => {
        if (page > numPages) setPage(numPages);
        else if (page < 1) setPage(1);
        else {
            onChange({
                newPage: page
            });
        }
    }, [page]);

    const showFirstButton = pageArray[0] > 1;
    const showFirstDots = pageArray[0] > 2;
    const showLastButton = pageArray[pageArray.length - 1] < numPages;
    const showLastDots = pageArray[pageArray.length - 1] < numPages - 1;

    return <>
        <div className="flex flex-row gap-2 align-center justify-center w-100">
            {showFirstButton ? <>
                <button onClick={() => setPage(1)}>1</button>
                {showFirstDots ? <div>...</div> : null}
            </> : null}
            {pageArray.map((pageNumber, key) => <button key={key} onClick={() => setPage(pageNumber)}>{pageNumber}</button>)}
            {showLastButton ? <>
                {showLastDots ? <div>...</div> : null}
                <button onClick={() => setPage(numPages)}>{numPages}</button>
            </> : null}
        </div>
    </>
}