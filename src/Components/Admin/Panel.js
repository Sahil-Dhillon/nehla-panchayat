import React, { useEffect, useState } from 'react';
import firebase from '../../Firebase/firebase'
import { FaPencilAlt, FaCheck, FaTrash } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

const PDS = () => {
    const [data, setData] = useState([]);
    // Fetch Data
    const fetchData = () => {
        const pdsRef = firebase.database().ref('PDS')
        pdsRef.on("value", (snap) => {
            const pdsSnap = snap.val()
            const pdsList = []
            for (let index in pdsSnap) {
                pdsList.push(pdsSnap[index])
            }
            setData(pdsList)
        })
    }
    // Calling the function
    useEffect(() => {
        fetchData();
    }, []);

    // Deleting Data
    const onDelete = ({ id }) => {
        const dataRef = firebase.database().ref('PDS').child(id)
        // window.confirm(`Delete Record with record as ${id}` ? dataRef.remove() : console.log("f"))
        // confirm("Delete Record ?" ? dataRef.remove() : alert("Error ,record not deleted!"))
        if (window.confirm(`Do you really want to delete record ${id}`)) {
            dataRef.remove()
        }
    }

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [quantity, setQuantity] = useState("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");


    const onEditQuantity = ({ id, currentValue }) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setQuantity(currentValue);
    }
    const onEditType = ({ id, currentValue }) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setType(currentValue);
    }
    const onEditName = ({ id, currentValue }) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setName(currentValue);
    }

    const onEdit = ({ id, quantity, name, type }) => {
        onEditName({ id: id, currentValue: name })
        onEditQuantity({ id: id, currentValue: quantity })
        onEditType({ id: id, currentValue: type })
    }


    /**
     *
     * @param id
     * @param newValue
     */
    const updateData = ({ id, newQuantity, newType, newName, date }) => {
        const pdsRef = firebase.database().ref("PDS").child(id)
        pdsRef.set({
            "date": date,
            "name": newName,
            "type": newType,
            "quantity": newQuantity
        })

        // pdsRef.quantity.set(newValue)
        onCancel();
        fetchData();
    }

    // Save Data

    const onSave = ({ id, newQuantity, newName, newType, date }) => {
        updateData({ id, newQuantity, newName, newType, date });
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setQuantity(null);
        setType(null);
        setName(null)
    }


    return (
        <section>

            <div className="flex flex-col text-center w-full mb-20">

                <table>
                    <thead>
                        <tr>
                            <th className="bg-black text-white border-gray-200 border  p-4">Date</th>
                            <th className="bg-black text-white border-gray-200 border  p-4">Name</th>
                            <th className="bg-black text-white border-gray-200 border  p-4">Type</th>
                            <th className="bg-black text-white border-gray-200 border  p-4">Quantity</th>
                            <th className="bg-black text-white border-gray-200 border  p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => (
                                <tr className="border-y-2 border-black" key={index}>
                                    <td className="bg-yellow-100 border border-black">{item.date}</td>
                                    <td className="bg-yellow-100 border border-black">
                                        {
                                            inEditMode.status && inEditMode.rowKey === index ? (
                                                <input value={name} className=" bg-white rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    onChange={(event) => setName(event.target.value)}
                                                />
                                            ) : (
                                                item.name
                                            )
                                        }
                                    </td>
                                    <td className="bg-yellow-100 border border-black">
                                        {
                                            inEditMode.status && inEditMode.rowKey === index ? (
                                                <input value={type} className=" bg-white rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    onChange={(event) => setType(event.target.value)}
                                                />
                                            ) : (
                                                item.type
                                            )
                                        }
                                    </td>
                                    <td className="bg-yellow-100 border border-black">
                                        {
                                            inEditMode.status && inEditMode.rowKey === index ? (
                                                <input value={quantity} className=" bg-white rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    onChange={(event) => setQuantity(event.target.value)}
                                                />
                                            ) : (
                                                item.quantity
                                            )
                                        }
                                    </td>
                                    <td className="bg-yellow-100 border border-black">
                                        {
                                            inEditMode.status && inEditMode.rowKey === index ? (
                                                <React.Fragment>
                                                    <button
                                                        className={"btn-success"}
                                                        onClick={() => onSave({ id: index, newQuantity: quantity, newName: name, newType: type, date: item.date })}
                                                    >
                                                        <FaCheck fill="green" />
                                                    </button>

                                                    <button
                                                        className={"btn-secondary"}
                                                        style={{ marginLeft: 8 }}
                                                        onClick={() => onCancel()}
                                                    >
                                                        <ImCross fill="red" />
                                                    </button>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>

                                                    <button
                                                        className={"btn-primary m-2"}
                                                        onClick={() => onEdit({ id: index, quantity: item.quantity, name: item.name, type: item.type })}
                                                    >
                                                        <FaPencilAlt fill="darkblue" />
                                                    </button>

                                                    <button
                                                        className={"btn-primary m-2"}
                                                        onClick={() => onDelete({ id: item.key })}
                                                    >
                                                        <FaTrash fill="darkblue" />
                                                    </button>
                                                </React.Fragment>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
}

const AddPdsRecord = () => {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [type, setType] = useState("")
    const handleSubmit = (e) => {
        const date = new Date()
        const key = date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getFullYear().toString() + "_" + date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString() + ":" + date.getMilliseconds().toString() + "_" + name + "_" + type + "_" + quantity
        e.preventDefault();
        firebase.database().ref("PDS").child(key).set({
            name: name,
            quantity: quantity,
            type: type,
            date: new Date().toLocaleString() + '',
            key: key

        })
        setName("")
        setQuantity("")
        setType("")
    }

    return (
        <>
            <form className="mb-5 w-full bg-yellow-100 border rounded border-gray-400 flex flex-col items-center" onSubmit={handleSubmit}>
                <legend className="text-gray-500">Add Record</legend>
                <fieldset className="flex items-center px-3 py-1 ">
                    <label htmlFor="name">Name:</label>
                    <input placeholder="Enter Name of Ration card holder" type="text" name="name" className="w-2/5 m-1 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mr-2 " required value={name} onChange={(e) => setName(e.target.value)} />


                    <label htmlFor="type">Type:</label>
                    <input placeholder="APL/BPL" type="text" name="type" className="w-1/4 m-1  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mr-2" required value={type} onChange={(e) => setType(e.target.value)} />

                    <label htmlFor="quantity">Quantity:</label>
                    <input placeholder="Enter Quantity in kg" type="text" name="quantity" className="w-1/4 mr-2 m-1 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                </fieldset>
                <fieldset className="flex w-1/3 items-center justify-center">
                    <button type="reset" className="bg-indigo-100 text-indigo-500 focus:outline-none hover:bg-indigo-200 rounded text-lg py-1 px-6 m-2">Clear</button>
                    <button type="submit" className="text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg m-2">Add</button>
                </fieldset>

            </form>
        </>
    )
}
const Panel = () => {

    return (
        <section>
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-gray-900">Admin Panel</h1>
                <div className="text-center lg:w-2/3 w-full">
                    <h1 className="sm:text-2xl text-xl font-medium title-font mb-8 text-gray-700">PDS Data</h1>
                    <AddPdsRecord />
                    <PDS />
                </div>
            </div>
        </section>
    )
}

export default Panel