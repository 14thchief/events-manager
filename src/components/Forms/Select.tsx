const Select = ({ options, value, onChange, disabled, name }: any) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border p-2 rounded-lg w-full font-normal"
      disabled={disabled}
    >
      {options?.map((option: any, i: number) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
