import { University } from "../../types/University";

interface UniversityTableRowProps {
  university: University;
  index: number;
}

export function UniversityTableRow({
  university,
  index,
}: UniversityTableRowProps) {
  const {
    Name: name,
    Initial: initial,
    Region: region,
    RegionType: regionType,
    State: state,
  } = university;

  return (
    <div className="grid grid-cols-5">
      <div>{name}</div>
      <div>{initial}</div>
      <div>{region.replace(/\_/g, " ")}</div>
      <div>{regionType}</div>
      <div>{state}</div>
    </div>
  );
}
