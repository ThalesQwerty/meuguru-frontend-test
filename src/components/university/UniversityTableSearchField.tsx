import { useEffect, useState } from "react";
import { University, UniversityFilter } from "../../types/University";
import { stateArray } from "../../data/states";
import { Input } from "../interface/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface UniversityTableSearchFieldProps {
  onChange: (params: { newSearch: string }) => void;
  initialValue?: string;
}

export function UniversityTableSearchField({
  onChange,
  initialValue,
}: UniversityTableSearchFieldProps) {
  const [search, setSearch] = useState<string>(initialValue ?? "");

  useEffect(() => {
    onChange({ newSearch: search });
  }, [search]);

  return (
    <>
      <div className="flex gap-2 flex-row items-center w-full max-w-sm">
        <FontAwesomeIcon
          className="text-purple-500"
          icon={faSearch}
        />
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
      </div>
    </>
  );
}
