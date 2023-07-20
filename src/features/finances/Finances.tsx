"use client";
import { TableRow, TableCell, Button } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import { joinTag } from "./finances.helper";
import {
    EditIcon,
    FilterIcon,
    Spinner,
    TableAction,
    TableData,
    TrashIcon,
    formatAmount,
    getAllData,
} from "@/shared";
import { FormFinance, Pagination } from "./components";
import { useTableFinances } from "./hooks";
import { FinanceAndTag, Tag } from "@/database";
import { useSearchParams } from "next/navigation";

export function Finances({ optionsTag }: FinancesProps) {
    const [openForm, setOpenForm] = useState(false);
    const [financeToUpdate, setFinanceToUpdate] = useState<FinanceAndTag>();
    const handleOpen = (financeToUpdate?: FinanceAndTag) => {
        setOpenForm(true);
        setFinanceToUpdate(financeToUpdate);
    };
    const handleClose = () => {
        setOpenForm(false);
        setFinanceToUpdate(undefined);
    };
    const { finances, loading, deleteFinance, setFinances, setLoading } =
        useTableFinances();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page") || 1);
    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        new Promise(async (resolve) => {
            setLoading(true);
            window.history.pushState(null, "", `?page=${page}`);
            const data = await getAllData<FinanceAndTag>({
                uri: `/api/finance?page=${page}`,
            });
            setFinances(data);
            setLoading(false);
            resolve("");
        });
    }, [page]);

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
                data={finances}
                row={(item) => (
                    <TableRow
                        sx={{
                            "&:last-child td, &:last-child th": {
                                border: 0,
                            },
                        }}
                    >
                        <TableCell>{item.label}</TableCell>
                        <TableCell>{joinTag(item.tags)}</TableCell>
                        <TableCell>{formatAmount(item.amount)} Ar</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <TableAction type="edit">
                                    <EditIcon
                                        onClick={() => handleOpen(item)}
                                    />
                                </TableAction>
                                <TableAction type="delete">
                                    <TrashIcon
                                        onClick={(e) => deleteFinance(item.id)}
                                    />
                                </TableAction>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            />
            <Pagination
                currentPage={page}
                onIncrement={() => setPage((last) => last + 1)}
                onDecrement={() => setPage((last) => last - 1)}
                disableNext={finances.length == 0}
                disablePrev={page <= 1}
            />
            {openForm && (
                <FormFinance
                    finance={financeToUpdate}
                    open={openForm}
                    onClose={handleClose}
                    optionsTag={optionsTag}
                />
            )}
            {loading && <Spinner />}
        </div>
    );
}

type FinancesProps = PropsWithChildren<{
    optionsTag: Tag[];
}>;
