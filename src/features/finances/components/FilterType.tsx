import {
    FormControl,
    InputLabel,
    MenuItem,
    Popover,
    Select,
} from "@mui/material";
import { PropsWithChildren } from "react";

export function FilterType({
    anchor,
    value,
    onClose,
    onChange,
}: FilterTypeProps) {
    return (
        <Popover
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            className="my-2"
        >
            <FormControl sx={{ width: 120 }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value?.length > 0 ? value : ""}
                    label="Age"
                    onChange={(e) => {
                        onChange(e.target.value);
                        onClose();
                    }}
                >
                    <MenuItem value={"depense"}>Dépense</MenuItem>
                    <MenuItem value={"revenue"}>Revenue</MenuItem>
                </Select>
            </FormControl>
        </Popover>
    );
}

type FilterTypeProps = PropsWithChildren<{
    onClose: () => void;
    value: string;
    onChange: (values: string) => void;
    anchor: HTMLButtonElement | null;
}>;
