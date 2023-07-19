import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { SelectMutliple } from "./SelectMutliple";
import { useFormSubmit } from "../hooks";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export function FormFinance({ idFinance, open, onClose }: FormFinanceProps) {
    const {
        tags,
        amount,
        label,
        handleChangeTag,
        handleAmount,
        handleLabel,
        handleSubmit,
    } = useFormSubmit();
    const type = idFinance ? "Modifier" : "Ajouter";

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form className="grid gap-5" onSubmit={handleSubmit(idFinance)}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {type} un item dans finance
                    </Typography>
                    <TextField
                        id="Label"
                        label="Libellé"
                        variant="standard"
                        value={label}
                        onChange={handleLabel}
                    />
                    <TextField
                        type="number"
                        id="amount"
                        label="Montant"
                        variant="standard"
                        value={amount || ""}
                        onChange={handleAmount}
                    />
                    <SelectMutliple tags={tags} onChangeTag={handleChangeTag} />
                    <Button variant="outlined">{type}</Button>
                </form>
            </Box>
        </Modal>
    );
}

type FormFinanceProps = PropsWithChildren<{
    idFinance?: number;
    open: boolean;
    onClose: () => void;
}>;
