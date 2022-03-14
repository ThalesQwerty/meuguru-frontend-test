import { useState } from "react";
import { University } from "../../types/University";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Region } from "../../types/locations";

interface UniversityTableProps {
  universities: University[];
  page: number;
  pageLength: number;
}

type SortingOrder = "asc" | "desc";

interface CurrentSorting {
  field: keyof University;
  order: SortingOrder;
}

export function UniversityTable({ universities: data, page, pageLength }: UniversityTableProps) {
  let universities = [...data].map((university) => {
    return {
      ...university,
      Region: university.Region.replace(/\_/g, " ") as Region,
    };
  });
  const [currentSorting, setCurrentSorting] = useState<CurrentSorting | null>(null);

  if (currentSorting) {
    if (currentSorting.order === "asc")
      universities = universities.sort((a, b) =>
        a[currentSorting.field] < b[currentSorting.field] ? -1 : a[currentSorting.field] > b[currentSorting.field] ? 1 : 0,
      );
    else
      universities = universities.sort((a, b) =>
        a[currentSorting.field] < b[currentSorting.field] ? 1 : a[currentSorting.field] > b[currentSorting.field] ? -1 : 0,
      );
  }

  const headerNames: { [key in keyof University]: string } = {
    Name: "Universidade",
    Initial: "Sigla",
    Type: "Tipo",
    Region: "Região",
    State: "Estado",
    RegionType: "Local",
  };

  const lowerLimit = (page - 1) * pageLength;
  const upperLimit = page * pageLength;

  function sortBy(field: keyof University) {
    const order: SortingOrder = currentSorting?.field === field && currentSorting?.order === "asc" ? "desc" : "asc";

    setCurrentSorting({
      field,
      order,
    });
  }

  return (
    <>
      <table className="university-table">
        <thead className="university-table-head">
          <tr>
            {Object.keys(headerNames).map((_key) => {
              const key = _key as keyof University;
              const label = headerNames[key];
              const active = currentSorting?.field === key;

              return (
                <th
                  scope="col"
                  className={`university-table-head-cell ${active ? "active" : ""}`}
                  onClick={() => sortBy(key)}
                  key={key}
                >
                  {active ? (
                    <Icon icon={currentSorting.order === "asc" ? faChevronUp : faChevronDown} className="mr-2" />
                  ) : null}
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="university-table-body">
          {universities.map((university, index) =>
            index >= lowerLimit && index < upperLimit ? (
              <tr className="university-table-body-row" key={index}>
                {Object.keys(headerNames).map((_key) => {
                  const key = _key as keyof University;

                  return (
                    <td scope="col" className="university-table-body-cell" key={key}>
                      {university[key]}
                    </td>
                  );
                })}
              </tr>
            ) : null,
          )}
        </tbody>
      </table>
    </>
  );
}
