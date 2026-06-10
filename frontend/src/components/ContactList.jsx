import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ContactList({ setContacts, contacts }) {
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);

            try {
                const query = `?status=${filter}&search=${search}`;

                const delay = new Promise((resolve) => setTimeout(resolve, 1000));

                const res = await axios.get(`http://localhost:8000/contacts${query}`);

                await delay;

                setContacts(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, [filter, search, setContacts]);

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`http://localhost:8000/contacts/${id}`, { status });

            setContacts((prev) =>
                prev.map((c) => c._id === id ? { ...c, status } : c)
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (contact) => {
        const name = window.prompt("Update name:", contact.name);
        if (name === null) return;

        const company = window.prompt("Update company:", contact.company);
        if (company === null) return;

        const email = window.prompt("Update email:", contact.email);
        if (email === null) return;

        const phone = window.prompt("Update phone:", contact.phone);
        if (phone === null) return;

        const status = window.prompt(
            "Update status: Interested, Follow-up, or Closed",
            contact.status
        );
        if (status === null) return;

        if (!name || !email) {
            return alert("Name and Email are required");
        }

        try {
            const res = await axios.put(`http://localhost:8000/contacts/${contact._id}`, {
                name,
                company,
                email,
                phone,
                status,
            });

            setContacts((prev) =>
                prev.map((c) => c._id === contact._id ? res.data : c)
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            try {
                await axios.delete(`http://localhost:8000/contacts/${id}`);

                setContacts((prev) =>
                    prev.filter((c) => c._id !== id)
                );
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <div className="flex gap-10">
                <select
                    className='p-2 rounded bg-[#00277a] text-white cursor-pointer outline-0'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Interested">Interested</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Closed">Closed</option>
                </select>

                <input
                    type="text"
                    placeholder='Search by name or company'
                    className='p-3 rounded w-full bg-[#eff4ff] outline-0'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className='w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] p-[20px] mt-10 gap-4'>
                    <p className='text-[#00277a] text-2xl font-semibold'>Loading...</p>
                </div>
            ) : (
                <>
                    <div className='mt-10'>
                        {contacts.length === 0 && (
                            <div className='w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] p-[20px] mt-10 gap-4 bg-[#eff4ff]'>
                                <p className='text-[#00277a] text-2xl font-semibold'>No contacts found</p>
                            </div>
                        )}
                    </div>

                    <div className='grid grid-cols-2 gap-10'>
                        {contacts.map((c) => (
                            <div key={c._id}>
                                <div className='bg-[#eff4ff] shadow-md rounded p-4 flex flex-col justify-between hover:shadow-lg transition'>
                                    <div>
                                        <div className="text-gray-500 text-sm flex gap-2 mb-5 mt-0 justify-between items-center">
                                            <h3 className='font-bold text-2xl text-[#00277a]'>{c.name}</h3>
                                            <p className='text-[#00277a] p-2 px-4 rounded bg-[#d3e6ff] font-medium'>{c.company}</p>
                                        </div>

                                        <div className='text-[16px] flex gap-2 my-3 justify-between border-2 border-[#00277a21] px-3 p-3 rounded'>
                                            <p>{c.email}</p>
                                            <p>{c.phone}</p>
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center mt-4'>
                                        <select
                                            value={c.status}
                                            className='p-1 rounded cursor-pointer outline-0 shadow'
                                            onChange={(e) => handleStatusChange(c._id, e.target.value)}
                                        >
                                            <option value="Interested">Interested</option>
                                            <option value="Follow-up">Follow-up</option>
                                            <option value="Closed">Closed</option>
                                        </select>

                                        <div className='flex gap-2'>
                                            <button
                                                className='bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition cursor-pointer'
                                                onClick={() => handleUpdate(c)}
                                            >
                                                Update
                                            </button>

                                            <button
                                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer'
                                                onClick={() => handleDelete(c._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}