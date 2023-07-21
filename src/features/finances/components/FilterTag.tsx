"use client";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { PropsWithChildren, useState } from "react";
import { Button, Popover } from "@mui/material";
import { Tag } from "@/database";

export function FilterTag({
    optionsTags,
    defaultValues = [],
    anchor,
    onClose,
    onSubmit,
}: FilterTagProps) {
    const [tagsSelected, setTagsSelected] = useState(defaultValues);
    const open = Boolean(anchor);

    return (
        <Popover
            anchorEl={anchor}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            className="my-2"
        >
            <div className="flex gap-2">
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={optionsTags.map((tag) => tag.name)}
                    value={tagsSelected}
                    disableCloseOnSelect
                    renderOption={(props, option, { selected }) => (
                        <li {...props} key={option}>
                            <Checkbox
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
                            placeholder="tags"
                        />
                    )}
                    onChange={(e, values) => {
                        setTagsSelected(values);
                    }}
                />
                <Button
                    variant="outlined"
                    className="h-12"
                    onClick={() => {
                        onSubmit(tagsSelected);
                        onClose();
                    }}
                >
                    Filtrer
                </Button>
            </div>
        </Popover>
    );
}

type FilterTagProps = PropsWithChildren<{
    onClose: () => void;
    optionsTags: Tag[];
    defaultValues?: string[];
    onSubmit: (values: string[]) => void;
    anchor: HTMLButtonElement | null;
}>;
