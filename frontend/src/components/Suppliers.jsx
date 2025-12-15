import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Suppliers = () => {

    const [addModal, setAddModal] = useState(null);
    const [editSupplier, setEditSupplier] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/supplier", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                },
            });

            setSuppliers(response.data.suppliers);

        } catch (error) {

            console.error("Error fetching suppliers:", error);
            setLoading(false);

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        fetchSuppliers();
    }, []);


    const handleEdit = (supplier) => {
        setFormData({
            name: supplier.name,
            email: supplier.email,
            number: supplier.number,
            address: supplier.address
        });
        setEditSupplier(supplier._id);
        setAddModal(true);
    }


    const closeModal = () => {
        setAddModal(false);
        setFormData({
            name: "",
            email: "",
            number: "",
            address: "",

        });
        setEditSupplier(null);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editSupplier) {
            try {
                const response = await axios.put(
                    `http://localhost:8000/api/supplier/${editSupplier}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                        },
                    }
                );

                if (response.data.success) {
                    alert("Supplier added successfully!");
                    setAddModal(false);
                    setFormData({
                        name: "",
                        email: "",
                        number: "",
                        address: "",

                    });
                } else {
                    console.error("Error adding category:", response.data);
                    alert("Error adding category. Please try again.");
                }
            } catch (error) {
                console.error("Error adding suplier:", error);
                alert("Error adding supplier. Please try again.");
            }
        } else {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/supplier/add",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                        },
                    }
                );

                if (response.data.success) {
                    alert("Supplier added successfully!");
                    setAddModal(false);
                    setFormData({
                        name: "",
                        email: "",
                        number: "",
                        address: "",

                    });
                } else {
                    console.error("Error adding category:", response.data);
                    alert("Error adding category. Please try again.");
                }
            } catch (error) {
                console.error("Error adding suplier:", error);
                alert("Error adding supplier. Please try again.");
            }
        }
    };




    return (
        <div className='w-full h-full flex flex-col gap-4 p-4'>
            <h1 className='text-2xl font-bold'>Supplier Management</h1>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder='Search' className='border p-1 bg-white rounded px-4' />
                <button
                    className='px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer'
                    onClick={() => setAddModal(1)}
                >
                    Add Supplier
                </button>
            </div>

            {loading ? <div>Loading......</div> : (
                <table className='w-full border-collapse border border-gray-300 mt-4'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-300 p-2'>S_NO</th>
                            <th className='border border-gray-300 p-2'>Supplier Name</th>
                            <th className='border border-gray-300 p-2'>Email</th>
                            <th className='border border-gray-300 p-2'>Phone Number</th>
                            <th className='border border-gray-300 p-2'>Address</th>
                            <th className='border border-gray-300 p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier, index) => (
                            <tr key={supplier._id}>
                                <td className='border border-gray-300 p-2'>{index + 1}</td>
                                <td className='border border-gray-300 p-2'>{supplier.name}</td>
                                <td className='border border-gray-300 p-2'>{supplier.email}</td>
                                <td className='border border-gray-300 p-2'>{supplier.number}</td>
                                <td className='border border-gray-300 p-2'>{supplier.address}</td>
                                <td className='border border-gray-300 p-2'>
                                    <button
                                        className='px-2 py-1 bg-yellow-500 text-white rounded cursor-pointer mr-2'
                                        onClick={() => handleEdit(supplier)}
                                    >
                                        Edit
                                    </button>
                                    <button className='px-2 py-1 bg-red-500 text-white rounded cursor-pointer'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}


            {addModal && (
                <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>

                    <div className='bg-white p-4 rounded shadow-md w-1/3 relative'>
                        <h1 className='text-xl font-bold'>Add Supplier</h1>

                        <button
                            className='absolute top-4 right-4 font-bold cursor-pointer text-lg'
                            onClick={closeModal}
                        >
                            X
                        </button>

                        <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Supplier Name'
                                className='border p-1 bg-white rounded px-4'
                            />
                            <input
                                type="email"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Supplier Email'
                                className='border p-1 bg-white rounded px-4'
                            />
                            <input
                                type="text"
                                name='number'
                                value={formData.number}
                                onChange={handleChange}
                                placeholder='Supplier Phone Number'
                                className='border p-1 bg-white rounded px-4'
                            />
                            <input
                                type="text"
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                placeholder='Supplier Address'
                                className='border p-1 bg-white rounded px-4'
                            />

                            <div className='flex space-x-2 '>
                                <button
                                    type="submit"
                                    className='w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600'
                                >
                                    {editSupplier ? "Save Changes" : "Add Supplier"}
                                </button>
                                {
                                    editSupplier && (
                                        <button
                                            type="button"
                                            className='w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600'
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    )
                                }
                            </div>

                        </form>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Suppliers

