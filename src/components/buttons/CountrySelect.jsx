import Select from "react-select";
import useCountries from "../../hooks/useCountries";
import PropTypes from "prop-types";

const CountrySelect = ({ value, onChange }) => {
    const { getAll } = useCountries();

    CountrySelect.propTypes = {
        value: PropTypes.object,
        onChange: PropTypes.func.isRequired,
      };
  
    return (
      <div>
        <Select
          placeholder="Anywhere"
          isClearable
          options={getAll()}
          value={value}
          onChange={(selectedOption) => onChange(selectedOption)}
          formatOptionLabel={(option) => (
            <div className="flex flex-row items-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label},
                <span className="text-neutral-500 ml-1">{option.region}</span>
              </div>
            </div>
          )}
          classNames={{
            control: () => "p-3 border-2",
            input: () => "text-lg",
            option: () => "text-lg",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#f9fafb",
            },
          })}
        />
      </div>
    );
  };
  
  export default CountrySelect;
