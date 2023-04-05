import { InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { HealthCheckRating } from "../../../types";
interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.keys(
  HealthCheckRating
)
  .filter((x) => !isNaN(Number(x)))
  .map((rating) => {
    return {
      value: Number(rating),
      label: HealthCheckRating[Number(rating)],
    };
  });

console.log(healthCheckRatingOptions);
interface HealthCheckProps {
  onHealthCheckRatingChange: (event: SelectChangeEvent<string>) => void;
  healthCheckRating: number;
}
const HealthCheck = (props: HealthCheckProps) => {
  return (
    <div>
      <InputLabel style={{ marginTop: 8 }}>Health check rating</InputLabel>
      <Select
        label="Health check rating"
        fullWidth
        value={props.healthCheckRating.toString()}
        onChange={props.onHealthCheckRatingChange}
      >
        {healthCheckRatingOptions.map((option) => {
          return (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};
export default HealthCheck;
