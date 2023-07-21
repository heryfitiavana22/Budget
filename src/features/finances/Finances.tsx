"use client";
import {
    TableRow,
    TableCell,
    Button,
    Pagination,
    Chip,
    IconButton,
    ButtonGroup,
} from "@mui/material";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
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
import { FormFinance, FilterTag } from "./components";
import { useTableFinances } from "./hooks";
import { FinanceAndTag, Tag } from "@/database";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function Finances({ optionsTag }: FinancesProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get("page") || 1);
    const tagsParams = searchParams.get("tags");
    const currentTags = tagsParams ? tagsParams.split(",") : [];
    const [page, setPage] = useState(currentPage);
    const [pageCounter, setPageCounter] = useState(1);
    const [tagsFiltered, setTagsFiltered] = useState<string[]>(currentTags);
    const [openForm, setOpenForm] = useState(false);
    const [financeToUpdate, setFinanceToUpdate] = useState<FinanceAndTag>();
    const handleOpenForm = (financeToUpdate?: FinanceAndTag) => {
        setOpenForm(true);
        setFinanceToUpdate(financeToUpdate);
    };
    const { finances, loading, deleteFinance, setFinances, setLoading } =
        useTableFinances();
    const [anchorTag, setAnchorTag] = useState<HTMLButtonElement | null>(null);

    useEffect(() => {
        new Promise(async (resolve) => {
            if (openForm) return resolve("");
            setLoading(true);
            let query = `?page=${page}`;
            if (tagsFiltered.length > 0)
                query += "&tags=" + tagsFiltered.join(",");

            router.push(`finances${query}`);
            const data = (await getAllData({
                uri: `/api/finance${query}`,
            })) as any;
            setFinances(data.finances);
            setPageCounter(data.pageCounter);
            setLoading(false);
            resolve("");
        });
    }, [page, tagsFiltered, searchParams, pathname, openForm]);

    useEffect(() => {
        const currentPage = Number(searchParams.get("page") || 1);
        const tagsParams = searchParams.get("tags");
        const currentTags = tagsParams ? tagsParams.split(",") : [];
        if (currentPage !== page) setPage(currentPage);
        if (currentTags !== tagsFiltered) setTagsFiltered(currentTags);
    }, [searchParams, pathname]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                >
                    <Button onClick={(e) => setAnchorTag(e.currentTarget)}>
                        Tags
                    </Button>
                    <Button onClick={(e) => setAnchorTag(e.currentTarget)}>
                        Type
                    </Button>
                    {Boolean(anchorTag) && (
                        <FilterTag
                            onClose={() => setAnchorTag(null)}
                            optionsTags={optionsTag}
                            defaultValues={tagsFiltered}
                            onSubmit={setTagsFiltered}
                            anchor={anchorTag}
                        />
                    )}
                </ButtonGroup>
                <div className="">
                    <Button variant="outlined" onClick={() => handleOpenForm()}>
                        Ajouter
                    </Button>
                </div>
            </div>
            <div className="flex gap-2 mt-2">
                {tagsFiltered.length > 0 && (
                    <Chip
                        label={`Tags : ${tagsFiltered.join(", ")}`}
                        onDelete={() => setTagsFiltered([])}
                    />
                )}
            </div>
            <TableData
                column={["Libellé", "Type", "Tag", "Montant", "Action"]}
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
                        <TableCell>
                            <Chip label={item.type} />
                        </TableCell>
                        <TableCell>
                            {item.tags.map((e) => (
                                <Chip label={e} key={e} />
                            ))}
                        </TableCell>
                        <TableCell>{formatAmount(item.amount)} Ar</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <TableAction type="edit">
                                    <EditIcon
                                        onClick={() => handleOpenForm(item)}
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
            <div className="flex justify-end mt-3">
                <Pagination
                    count={pageCounter}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, value) => setPage(value)}
                />
            </div>
            {openForm && (
                <FormFinance
                    finance={financeToUpdate}
                    open={openForm}
                    onClose={() => {
                        setOpenForm(false);
                        setFinanceToUpdate(undefined);
                    }}
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
