import { useEffect, useState } from "react";
import { University, UniversityFilter } from "../../types/University";
import { stateArray } from "../../data/states";

interface UniversityTableSearchFieldProps {
    onChange: (params: {newSearch: string}) => void,
    initialValue?: string
}

export function UniversityTableSearchField({ onChange, initialValue }: UniversityTableSearchFieldProps) {
    const [search, setSearch] = useState<string>(initialValue ?? "");

    useEffect(() => {
        onChange({ newSearch: search });
    }, [search]);

    return <>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
    </>
}