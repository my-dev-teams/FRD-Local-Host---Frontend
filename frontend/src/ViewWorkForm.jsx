import React, { useState } from 'react';

const WorkComponent = ({ workData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = workData.filter(item => {
    const matchesSearch =
      ['name', 'nic', 'empId', 'companyName'].some(key =>
        String(item[key])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

    return matchesSearch;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredData.map(item => (
          <li key={item.empId}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkComponent;