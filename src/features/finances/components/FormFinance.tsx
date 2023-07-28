import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { FormEvent, PropsWithChildren, useState } from "react";
import { SelectTags } from "./SelectTags";
import { FinanceAndTag, Tag } from "@/database";
import { Spinner, createData, updateOneDataById } from "@/shared";

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

export function FormFinance({
    finance,
    open,
    onClose,
    optionsTag,
}: FormFinanceProps) {
    const [tags, setTags] = useState<string[]>(finance?.tags || []);
    const [type, setType] = useState(finance?.type || "");
    const [amount, setAmount] = useState<number>(finance?.amount || 0);
    const [label, setLabel] = useState(finance?.label || "");
    const [message, setMessage] = useState("");
    const [submitResult, setSubmitResult] = useState<Alert>("info");
    const [loading, setLoading] = useState(false);
    const typeResult = finance ? "Modifier" : "Ajouter";

    const resetValue = () => {
        setTags([]);
        setAmount(0);
        setLabel("");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (tags.length == 0 || !amount || !label || !type) {
            setSubmitResult("error");
            return setMessage("Remplir tous les champs");
        }
        const currentFinance = {
            ...finance,
            amount,
            label,
            tags,
            type,
        } as FinanceAndTag;

        setLoading(true);

        try {
            // if update
            if (finance) {
                await updateOneDataById("/api/finance", currentFinance);
                setMessage("Finance mis à jour");
            } else {
                await createData("/api/finance", currentFinance);
                setMessage("Finance crée");
            }
            setSubmitResult("success");
            resetValue();
            setLoading(false);
            onClose();
        } catch (error: any) {
            setMessage(error.message);
            setSubmitResult("error");
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className="grid gap-5" onSubmit={handleSubmit}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            {typeResult} un item dans finance
                        </Typography>
                        <TextField
                            id="Label"
                            label="Libellé"
                            variant="standard"
                            value={label}
                            onChange={(e) => setLabel(e.currentTarget.value)}
                        />
                        <TextField
                            type="number"
                            id="amount"
                            label="Montant"
                            variant="standard"
                            value={amount || ""}
                            onChange={(e) =>
                                setAmount(Number(e.currentTarget.value))
                            }
                        />
                        <div>
                            <InputLabel id="demo-simple-select-autowidth-label">
                                Type :
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                autoWidth
                                label="Age"
                            >
                                <MenuItem value={"depense"}>Dépense</MenuItem>
                                <MenuItem value={"revenue"}>Revenue</MenuItem>
                            </Select>
                        </div>
                        <SelectTags
                            tagsSelected={tags}
                            onChangeTag={(e, values) => setTags(values)}
                            optionsTag={optionsTag}
                        />
                        <Button type="submit" variant="outlined">
                            {typeResult}
                        </Button>
                        {message && (
                            <Alert severity={submitResult}>{message}</Alert>
                        )}
                    </form>
                </Box>
            </Modal>
            {loading && <Spinner />}
        </>
    );
}

type FormFinanceProps = PropsWithChildren<{
    finance?: FinanceAndTag;
    open: boolean;
    onClose: () => void;
    optionsTag: Tag[];
}>;
