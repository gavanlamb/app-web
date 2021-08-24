import { TextField, Autocomplete } from '@material-ui/core';

// ----------------------------------------------------------------------

type MultipleValuesProps = {
  options: {
    title: string;
    year: number;
  }[];
};

export default function MultipleValues({ options }: MultipleValuesProps) {
  return (
    <Autocomplete
      multiple
      fullWidth
      options={options}
      getOptionLabel={(option) => option.title}
      defaultValue={[options[13]]}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label="filterSelectedOptions" placeholder="Favorites" />
      )}
    />
  );
}
