import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const StatisticsTable = ({ mode = false, data = [] }) => {
    const columns = [
        {
            field: 'title',
            headerName: mode === false ? 'Ingredient name' : 'Recipe name',
            editable: false,
            flex: 1,
        },
        {
            field: 'value',
            headerName: 'Count',
            editable: false,
            minWidth: 150,
        },
    ];

    return (
        <div style={{ display: 'flex', height: '600px' }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'value', sort: 'desc' }],
                        },
                    }}
                    columns={columns}
                    rows={data}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            background: '#f3f4f6',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default StatisticsTable;
