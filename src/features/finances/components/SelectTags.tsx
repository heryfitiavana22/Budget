import { PropsWithChildren, SyntheticEvent } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { Tag } from "@/database";

export function SelectTags({
    optionsTag,
    tagsSelected,
    onChangeTag,
}: SelectTagsProps) {
    return (
        <Autocomplete
            multiple
            value={tagsSelected}
            id="tags-filled"
            options={optionsTag.map((option) => option.name)}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                    <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                        key={index}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Tags"
                    placeholder="Tags"
                />
            )}
            onChange={onChangeTag}
        />
    );
}

type SelectTagsProps = PropsWithChildren<{
    optionsTag: Tag[];
    tagsSelected: string[];
    onChangeTag: (e: SyntheticEvent<Element, Event>, values: string[]) => void;
}>;
