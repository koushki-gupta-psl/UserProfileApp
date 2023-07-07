import { Paper,TableSortLabel } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import wretch from "wretch"
import { UserDetails } from '../../context/type';
import { UserContext } from '../../context/usercontext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';
import './home.css';


function useUser() {
    const userCont = useContext(UserContext)
    if (!userCont) {
        throw new Error("error")
    }
    return userCont;
}
interface Column {
    id: 'name' | 'email' | 'phone';
    label: string;
    minWidth?: number;
    align?: 'right';

}

const columns: readonly Column[] = [
    { id: 'name', label: 'NAME', minWidth: 80 },
    { id: 'email', label: 'EMAIL', minWidth: 100 },
    { id: 'phone', label: 'PHONE NO', minWidth: 60 }

];

export const Home = () => {
    const { users, setUser } = useUser();
    const [rows, setRows] = useState<UserDetails[]>(users);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searched, setSearched] = useState<string>("");
    const [sortColumn, setSortColumn] = useState('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const requestSearch = (searchedVal: string) => {
        const filtereduser = users.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        })
        setRows(filtereduser);
    }
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    }
    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortColumn(column);
            setSortOrder('asc');
        }
        const sortedData = rows.sort((a: UserDetails, b: UserDetails) => {
            const aValue = a[sortColumn as keyof UserDetails];
            const bValue = b[sortColumn as keyof UserDetails];
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
           return 0;

        });
        setRows(sortedData);
    }
    useEffect(() => {
        const fetchuser = async () => {
            const api = await wretch("https://jsonplaceholder.typicode.com/users")
                .get()
                .json<UserDetails[]>()
            setUser(api);
            setRows(api);
        };
        fetchuser();

    }, [])

    return (
        <Paper sx={{ width: '80%', overflow: 'hidden',marginLeft:'8rem',marginTop:'5rem'}}>
            <SearchBar style={{ margin: '1rem' }} value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}></SearchBar>
            <TableContainer className="tableContainer">
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                className="tableHead"
                                >
                                    <TableSortLabel
                                        active={sortColumn === column.id}
                                        direction={sortColumn === column.id ? sortOrder : 'asc'}
                                        onClick={() => handleSort(column.id)}
                                       className="sortLabel"
                                    />
                                    {column.label}

                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.
                            slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => {
                                return (
                                    // <Link to='/user'>
                                    <TableRow tabIndex={-1} component={Link} to={`/user/${user.id}`} state={{ userdata: user }} style={{ textDecoration: 'none' }}>

                                        {columns.map((column) => {
                                            const value = user[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                    //   </Link>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

