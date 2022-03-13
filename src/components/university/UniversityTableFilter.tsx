import { useEffect, useState } from "react";
import { University, UniversityFilter } from "../../types/University";
import { stateArray } from "../../data/states";
import { Select } from "../interface/Select";

interface UniversityTableFilterProps {
    onChange: (params: {newFilter: UniversityFilter}) => void
}

export function UniversityTableFilter({ onChange }: UniversityTableFilterProps) {
    type FilterField = Exclude<keyof University, "Name"|"Initial">;

    const [currentKey, setCurrentKey] = useState<FilterField|null>(null);
    const [currentValue, setCurrentValue] = useState<string|null>(null);

    const options: {[key in FilterField]: {label: string, values: University[key][], formatValue?: (value: string) => string}} = {
        Type: { label: "Tipo", values: ["Privada", "Pública"] },
        Region: { label: "Região", values: ["Centro_Oeste", "Nordeste", "Norte", "Sudeste", "Sul"], formatValue: value => value.replace(/\_/g, " ")},
        State: { label: "Estado", values: stateArray},
        RegionType: { label: "Local", values: ["Capital", "Interior"] }
    };

    useEffect(() => {
        setCurrentValue(currentKey ? options[currentKey].values[0] : null);
    }, [currentKey]);

    useEffect(() => {
        onChange({newFilter: university => !currentKey || !currentValue || university[currentKey] === currentValue});
    }, [currentValue]);

    return <>
        <div className="flex flex-col">
            <div className="flex justify-center items-end gap-2">
            {currentKey ? <span className="select-none">Filtrar por...</span> : null}
                <Select onChange={({target}) => setCurrentKey(target.value as FilterField || null)}>
                {currentKey ? <option selected={currentKey == null} value={""}>Não filtrar</option> : <option className="text-gray-500" selected={currentKey == null} value={""} disabled>Filtrar por...</option>}
                    {Object.keys(options).map(_key => {
                        const key = _key as FilterField;
                        const { label } = options[key];

                        return <option key={key} value={key}>{label}</option>;
                    })}
                </Select>
                {currentKey ?
                    <Select onChange={({target}) => setCurrentValue(target.value)}>
                        {currentValue ? null : <option className="text-gray-500" selected={currentValue == null} value={""}>Valor...</option>}
                        {options[currentKey].values.map((_value, index) => {
                            const value = _value;
                            const label = options[currentKey].formatValue?.(_value) ?? _value;
                            return <option key={index} value={value}>{label}</option>;
                        })}
                    </Select> : null}
            </div>
        </div>
    </>
}