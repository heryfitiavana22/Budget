import {
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table,
} from "@mui/material";
import React, { PropsWithChildren } from "react";

export function TableData<T>({ column, data, row }: TableDataProps<T>) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {column.map((name, k) => (
                            <TableCell key={k}>{name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, k) => (
                        <React.Fragment key={k}>{row(item)}</React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

type TableDataProps<T> = PropsWithChildren<{
    column: string[];
    data: T[];
    row: (item: T) => JSX.Element;
}>;
