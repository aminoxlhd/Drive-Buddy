// src/pages/my-order-page/MyOrderPage.js
import React, { useState } from 'react';
import { useTable } from 'react-table';
import './OrderPage.scss';

const MyOrderPage = () => {
    const [user, setUser] = useState({
        isLoggedIn: true,
        type: 'student', // 'student' or 'teacher'
        avatarUrl: 'path/to/avatar.jpg',
    });

    const handleLogin = () => {
        setUser({
            isLoggedIn: true,
            type: user.type === 'student' ? 'teacher' : 'student',
            avatarUrl: user.type === 'student' ? 'path/to/new-avatar.jpg' : 'path/to/avatar.jpg',
        });
    };

    const orders = [
        {
            id: '1',
            studentName: 'John Doe',
            phoneNumber: '123-456-7890',
            vehicleCategory: 'SUV',
            date: '2024-07-13',
            address: '123 Main St',
        },
        // Add more order objects as needed
    ];

    const columns = React.useMemo(() => {
        const baseColumns = [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Date of Driving', accessor: 'date' },
            { Header: 'Address', accessor: 'address' },
        ];

        if (user.type === 'teacher') {
            return [
                ...baseColumns,
                { Header: 'Student Name', accessor: 'studentName' },
                { Header: 'Phone Number', accessor: 'phoneNumber' },
                { Header: 'Vehicle Category', accessor: 'vehicleCategory' },
            ];
        }

        return baseColumns;
    }, [user.type]);

    const data = React.useMemo(() => orders, [orders]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className="container">
            <div className="my-order-page">
                <h1>My Orders</h1>
                <button onClick={handleLogin}>
                    {user.type === 'student' ? 'Switch to Teacher View' : 'Switch to Student View'}
                </button>
                <table {...getTableProps()} className="orders-table">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyOrderPage;
