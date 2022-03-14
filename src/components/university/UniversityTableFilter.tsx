import { useEffect, useState } from "react";
import { University, UniversityFilter } from "../../types/University";
import { stateArray } from "../../data/states";
import { Select } from "../interface";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

interface UniversityTableFilterProps {
  onChange: (params: { newFilter: UniversityFilter }) => void;
}

export function UniversityTableFilter({ onChange }: UniversityTableFilterProps) {
  type FilterField = Exclude<keyof University, "Name" | "Initial">;

  const [currentKey, setCurrentKey] = useState<FilterField | null>(null);
  const [currentValue, setCurrentValue] = useState<string | null>(null);

  const options: {
    [key in FilterField]: {
      label: string;
      values: University[key][];
      formatValue?: (value: string) => string;
    };
  } = {
    Type: { label: "Tipo", values: ["Privada", "Pública"] },
    Region: {
      label: "Região",
      values: ["Centro_Oeste", "Nordeste", "Norte", "Sudeste", "Sul"],
      formatValue: (value) => value.replace(/\_/g, " "),
    },
    State: { label: "Estado", values: stateArray.map((state) => state.acronym) },
    RegionType: {
      label: "Local",
      values: ["Capital", "Interior"],
    },
  };

  useEffect(() => {
    setCurrentValue(currentKey ? options[currentKey].values[0] : null);
  }, [currentKey]);

  useEffect(() => {
    onChange({
      newFilter: (university) => !currentKey || !currentValue || university[currentKey] === currentValue,
    });
  }, [currentValue]);

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-2 lg:flex-nowrap">
        <Icon icon={faFilter} className={currentKey ? "text-purple-500" : "gray-text"} />
        {currentKey ? <span className="select-none whitespace-nowrap">Filtrar por</span> : null}
        <Select onChange={({ target }) => setCurrentKey((target.value as FilterField) || null)}>
          {currentKey ? (
            <option selected={currentKey == null} value={""}>
              Não filtrar
            </option>
          ) : (
            <option className="text-gray-500" selected={currentKey == null} value={""} disabled>
              Filtrar por...
            </option>
          )}
          {Object.keys(options).map((_key) => {
            const key = _key as FilterField;
            const { label } = options[key];

            return (
              <option key={key} value={key} selected={currentKey === key}>
                {label}
              </option>
            );
          })}
        </Select>
        {currentKey ? (
          <Select onChange={({ target }) => setCurrentValue(target.value)}>
            {currentValue ? null : (
              <option className="text-gray-500" selected={currentValue == null} value={""}>
                Valor...
              </option>
            )}
            {options[currentKey].values.map((_value, index) => {
              const value = _value;
              const label = options[currentKey].formatValue?.(_value) ?? _value;
              return (
                <option key={index} value={value} selected={currentValue === value}>
                  {label}
                </option>
              );
            })}
          </Select>
        ) : null}
      </div>
    </>
  );
}
