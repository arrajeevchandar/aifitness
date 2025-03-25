const CustomTableHeader = ({ colName }) => (
	<th className="p-4 text-left text-gray-100 uppercase text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-700 border-b border-gray-700 shadow-md">
	  {colName}
	</th>
  );
  
  const CustomTableData = ({ data }) => (
	<td className="border-b border-gray-700 p-4 text-gray-300 text-center bg-gray-900 group-hover:bg-gradient-to-r group-hover:from-purple-700 group-hover:to-indigo-600 transition-all duration-200">
	  {data}
	</td>
  );
  
  const CustomTable = ({ exercises }) => {
	return (
	  <table className="border-collapse table-fixed w-full text-sm mb-3 rounded-lg shadow-lg overflow-hidden">
		<thead>
		  <tr>
			<CustomTableHeader colName={"Exercise"} />
			<CustomTableHeader colName={"Sets"} />
			<CustomTableHeader colName={"Reps"} />
			<CustomTableHeader colName={"Weights"} />
			<CustomTableHeader colName={"Rest Between Sets"} />
			<CustomTableHeader colName={"Calories Burnt"} />
		  </tr>
		</thead>
		<tbody>
		  {exercises.map(({ exercise, sets, reps, weight, rest,calories }, index) => (
			<tr key={index} className="group transition-all duration-200 hover:scale-[1.02]">
			  <CustomTableData data={exercise} />
			  <CustomTableData data={sets} />
			  <CustomTableData data={reps} />
			  <CustomTableData data={weight} />
			  <CustomTableData data={rest} />
			  <CustomTableData data={calories} />
			</tr>
		  ))}
		</tbody>
	  </table>
	);
  };
  
  export default CustomTable;
  