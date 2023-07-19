import { useState } from "react";

export function useModalForm() {
    const [open, setOpen] = useState(false);
    const [idFinance, setIdFinance] = useState<number>();

    return {
        open,
        idFinance,
        setIdFinance,
        handleOpen: (id = 0) => {
            setOpen(true);
            setIdFinance(id);
        },
        handleClose: () => {
            setOpen(false);
            setIdFinance(0);
        },
    };
}
