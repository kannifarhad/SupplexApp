import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TableTr = ({ trData, ...rest }) => {
    return (
        <tr>
            {(Array.isArray(trData)) ?

                trData.map(({ value, ...rest }, i) =>
                    <TableCell key={i} {...rest}>{value}</TableCell>
                )
                :
                <TableCell className='text-center' {...rest} >Məlumat yoxdur</TableCell>
            }
        </tr>
    );
}

export default ({ tableData }) => {
    const { header, body, ...rest } = tableData;
    return (
        <TableContainer component={Paper}>
            <Table {...rest} aria-label="simple table">
                {
                    header && Array.isArray(header) &&
                    <TableHead>
                        <TableRow>
                            {
                                header.map(({ title, ...rest }, i) =>
                                    <TableCell {...rest} key={i}>{title}</TableCell>
                                )
                            }
                        </TableRow>
                    </TableHead>
                }

                <TableBody>
                    {
                        Array.isArray(body) && body.length > 0 ?

                            body.map((data, i) =>
                                <TableTr
                                    key={i}
                                    trData={data}
                                />
                            )

                            : <TableTr colSpan={header.length} />
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
