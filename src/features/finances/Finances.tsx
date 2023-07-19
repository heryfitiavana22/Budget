"use client";
import { TableRow, TableCell, Button } from "@mui/material";
import { PropsWithChildren } from "react";
import { data } from "./finances-mock";
import { joinTag } from "./finances.helper";
import {
    EditIcon,
    FilterIcon,
    TableAction,
    TableData,
    TrashIcon,
    formatAmount,
} from "@/shared";
import { FormFinance } from "./components";
import { useModalForm } from "./hooks";

export function Finances({}: FinancesProps) {
    const { open, idFinance, handleClose, handleOpen } = useModalForm();

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div className="">
                    <FilterIcon />
                </div>
                <div className="">
                    <Button variant="outlined" onClick={() => handleOpen()}>
                        Ajouter
                    </Button>
                </div>
            </div>
            <TableData
                column={["Libellé", "Tag", "Montant", "Action"]}
                data={data}
                row={(item) => (
                    <TableRow
                        sx={{
                            "&:last-child td, &:last-child th": {
                                border: 0,
                            },
                        }}
                    >
                        <TableCell>{item.label}</TableCell>
                        <TableCell>{joinTag(item.tag)}</TableCell>
                        <TableCell>{formatAmount(item.montant)} Ar</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <TableAction type="edit">
                                    <EditIcon
                                        onClick={() => handleOpen(item.id)}
                                    />
                                </TableAction>
                                <TableAction type="delete">
                                    <TrashIcon />
                                </TableAction>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            />
            <FormFinance
                idFinance={idFinance}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}

type FinancesProps = PropsWithChildren<{}>;
