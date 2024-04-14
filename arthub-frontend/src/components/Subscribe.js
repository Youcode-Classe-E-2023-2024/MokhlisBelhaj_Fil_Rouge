import React from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';

function Subscribe({ followers, following }) {
  // Dummy data if followers or following props are not provided
  if (!followers) {
    followers = [
      { name: 'John Doe', status: 'Follower' },
      { name: 'Jane Smith', status: 'Following' },
      // Add more dummy followers as needed
    ];
  }

  if (!following) {
    following = [
      { name: 'Alice Johnson', status: 'Follower' },
      { name: 'Bob Brown', status: 'Following' },
      // Add more dummy following as needed
    ];
  }

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Status', accessor: 'status' },
  ];

  const followerData = followers.map(follower => ({
    ...follower,
    id: follower.name.replace(/\s+/g, '-').toLowerCase(),
  }));

  const followingData = following.map(following => ({
    ...following,
    id: following.name.replace(/\s+/g, '-').toLowerCase(),
  }));

  const {
    getTableProps: getFollowerTableProps,
    getTableBodyProps: getFollowerTableBodyProps,
    headerGroups: followerHeaderGroups,
    rows: followerRows,
    prepareRow: prepareFollowerRow,
    setGlobalFilter: setFollowerGlobalFilter,
  } = useTable(
    { columns, data: followerData },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps: getFollowingTableProps,
    getTableBodyProps: getFollowingTableBodyProps,
    headerGroups: followingHeaderGroups,
    rows: followingRows,
    prepareRow: prepareFollowingRow,
    setGlobalFilter: setFollowingGlobalFilter,
  } = useTable(
    { columns, data: followingData },
    useFilters,
    useGlobalFilter
  );

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">My Followers</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="followerSearch" className="mr-2">Search:</label>
        <input
          id="followerSearch"
          type="text"
          onChange={(e) => setFollowerGlobalFilter(e.target.value || undefined)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Search followers..."
        />
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-4">
        <table {...getFollowerTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {followerHeaderGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getFollowerTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {followerRows.map((row, rowIndex) => {
              prepareFollowerRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      key={cellIndex}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h2 className="text-lg font-bold mb-4">People I'm Following</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="followingSearch" className="mr-2">Search:</label>
        <input
          id="followingSearch"
          type="text"
          onChange={(e) => setFollowingGlobalFilter(e.target.value || undefined)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Search following..."
        />
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table {...getFollowingTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {followingHeaderGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getFollowingTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {followingRows.map((row, rowIndex) => {
              prepareFollowingRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      key={cellIndex}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subscribe;
