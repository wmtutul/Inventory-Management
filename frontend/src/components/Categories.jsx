// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Categories = () => {
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryDescription, setCategoryDescription] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:8000/api/category", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
//           },
//         });

//         setCategories(response.data.categories);
//         setLoading(false);

//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await axios.post(
//       "http://localhost:8000/api/category/add",
//       { categoryName, categoryDescription },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
//         },
//       }
//     );

//     if (response.data.success) {
//       setCategoryName("");
//       setCategoryDescription("");
//       alert("Category added successfully!");
//     } else {
//       console.log("Error adding category:", data);
//       alert("Error adding category. Please try again.");
//     }
//   };


//   if (loading) return <div>Loading......</div>


//   return (
//     <div className='p-4'>
//       <h1 className='text-2xl font-bold mb-8'>Category Management</h1>

//       <div className='flex flex-col lg:flex-row gap-4'>
//         <div className='lg:w-1/3'>
//           <div className="bg-white shadow-md rounded-lg p-4">
//             <h2 className='text-center text-xl font-bold mb-4'>Add Category</h2>
//             <form className='space-y-4' onSubmit={handleSubmit}>
//               <div>
//                 <input
//                   type="text"
//                   placeholder='Category Name'
//                   className='border w-full p-2 rounded-md'
//                   onChange={(e) => setCategoryName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder='Category Description'
//                   className='border w-full p-2 rounded-md'
//                   onChange={(e) => setCategoryDescription(e.target.value)}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className='w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-400'
//               >
//                 Add Category
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className='lg:w-2/3'>
//           <div className='bg-white shadow-md rounded-lg p-4'>
//             <table className='w-full border-collapse border border-gray-200'>
//               <thead>
//                 <tr className='bg-gray-100'>
//                   <th className='border border-gray-200 p-2'>S-No</th>
//                   <th className='border border-gray-200 p-2'>Category Name</th>
//                   <th className='border border-gray-200 p-2'>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categories.map((category, index) => (
//                   <tr key={index}>
//                     <td className='border border-gray-200 p-2'>{index + 1}</td>
//                     <td className='border border-gray-200 p-2'>{category.categoryName}</td>
//                     <td className='border border-gray-200 p-2'>
//                       <button className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2'>Edit</button>
//                       <button className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600'>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Categories




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Moved fetchCategories outside useEffect so we can use it anywhere
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });

      setCategories(response.data.categories);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/api/category/add",
      { categoryName, categoryDescription },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      }
    );

    if (response.data.success) {
      setCategoryName("");
      setCategoryDescription("");
      alert("Category added successfully!");

      // 🔥 Refresh table after adding category
      fetchCategories();
    } else {
      console.log("Error adding category:", response.data);
      alert("Error adding category. Please try again.");
    }
  };

  if (loading) return <div>Loading......</div>;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-8'>Category Management</h1>

      <div className='flex flex-col lg:flex-row gap-4'>
        
        {/* Add Category */}
        <div className='lg:w-1/3'>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className='text-center text-xl font-bold mb-4'>Add Category</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  placeholder='Category Name' 
                  className='border w-full p-2 rounded-md'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder='Category Description' 
                  className='border w-full p-2 rounded-md'
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className='w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-400'
              >
                Add Category
              </button>
            </form>
          </div>
        </div>

        {/* Category List Table */}
        <div className='lg:w-2/3'>
          <div className='bg-white shadow-md rounded-lg p-4'>
            <table className='w-full border-collapse border border-gray-200'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border border-gray-200 p-2'>S-No</th>
                  <th className='border border-gray-200 p-2'>Category Name</th>
                  <th className='border border-gray-200 p-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td className='border border-gray-200 p-2'>{index + 1}</td>
                    <td className='border border-gray-200 p-2'>{category.categoryName}</td>
                    <td className='border border-gray-200 p-2'>
                      <button className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer mr-2'>Edit</button>
                      <button className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 cursor-pointer'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;


