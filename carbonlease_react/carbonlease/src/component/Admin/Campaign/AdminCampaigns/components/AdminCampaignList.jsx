

const AdminCampaignList = ({ campaigns, columns, onEdit, onDelete }) => {
  if (!campaigns || campaigns.length === 0) {
    return <div>캠페인 데이터가 없습니다.</div>;
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns && columns.map((col) => (
            <th key={col.field}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {campaigns.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => {
              const value = row[col.field];
              if (col.render) {
                // render(value, row, { onEdit, onDelete })
                return <td key={col.field}>{col.render(value, row, { onEdit, onDelete })}</td>;
              }
              return <td key={col.field}>{value}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminCampaignList;
