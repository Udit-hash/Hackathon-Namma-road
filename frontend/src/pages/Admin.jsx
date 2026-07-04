import { useEffect, useState } from "react";
import axios from "axios";

export const Admin = () => {

    const [potholes, setPotholes] = useState([]);
    const [filter, setFilter] = useState("");


    const fetchData = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3000/api/v1/potholes/admin/all",
                {
                    params: filter ? { status: filter } : {},

                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token")
                    }
                }
            );


            setPotholes(res.data.potholes);


        } catch (error) {

            console.log(error);

        }

    };



    const updateStatus = async (id, status) => {

        try {

            await axios.put(

                `http://localhost:3000/api/v1/potholes/admin/update/${id}`,

                {
                    status
                },

                {
                    headers: {

                        Authorization:
                            "Bearer " + localStorage.getItem("token")

                    }
                }

            );


            fetchData();


        } catch (error) {

            console.log(error);

        }

    };





    const deleteReport = async (id) => {


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this pothole report?"
        );


        if (!confirmDelete) {

            return;

        }



        try {


            await axios.delete(

                `http://localhost:3000/api/v1/potholes/admin/delete/${id}`,

                {
                    headers: {

                        Authorization:
                            "Bearer " + localStorage.getItem("token")

                    }
                }

            );



            fetchData();



        } catch (error) {

            console.log(error);

        }


    };





    useEffect(() => {

        fetchData();

    }, [filter]);





    return (

        <div className="p-8 bg-gray-50 min-h-screen">


            <h1 className="text-3xl font-bold mb-6 text-gray-800">

                Admin Dashboard

            </h1>





            {/* STATS */}


            <div className="grid grid-cols-3 gap-5 mb-8">


                <div className="bg-blue-100 p-5 rounded-xl shadow text-center">

                    <h2 className="font-bold text-2xl">

                        {potholes.length}

                    </h2>

                    <p className="text-blue-700">

                        Total Reports

                    </p>

                </div>




                <div className="bg-yellow-100 p-5 rounded-xl shadow text-center">

                    <h2 className="font-bold text-2xl">

                        {
                            potholes.filter(
                                p => p.status === "pending"
                            ).length
                        }

                    </h2>

                    <p className="text-yellow-700">

                        Pending Reports

                    </p>

                </div>




                <div className="bg-green-100 p-5 rounded-xl shadow text-center">

                    <h2 className="font-bold text-2xl">

                        {
                            potholes.filter(
                                p => p.status === "resolved"
                            ).length
                        }

                    </h2>


                    <p className="text-green-700">

                        Resolved Reports

                    </p>

                </div>


            </div>






            {/* FILTER */}


            <div className="bg-white shadow rounded-xl p-5 mb-6">


                <label className="font-semibold mr-3">

                    Filter Status:

                </label>



                <select

                    value={filter}

                    onChange={
                        (e) =>
                            setFilter(e.target.value)
                    }

                    className="border rounded-lg px-4 py-2"

                >


                    <option value="">

                        All

                    </option>


                    <option value="pending">

                        Pending

                    </option>


                    <option value="important">

                        Important

                    </option>


                    <option value="completed">

                        Completed

                    </option>


                    <option value="resolved">

                        Resolved

                    </option>


                </select>


            </div>







            {/* REPORT LIST */}



            <div className="grid grid-cols-1 gap-5">



                {
                    potholes.length === 0 &&


                    <p className="text-gray-500 text-center">

                        No pothole reports found.

                    </p>

                }






                {

                    potholes.map((p) => (



                        <div

                            key={p._id}

                            className="bg-white rounded-xl shadow-md p-5 flex gap-6 hover:shadow-lg transition"

                        >




                            <img

                                src={p.photoUrl}

                                alt="pothole"

                                className="w-40 h-32 object-cover rounded-lg"

                            />







                            <div className="flex-1">



                                <h2 className="font-bold text-lg">

                                    {p.description}

                                </h2>





                                <p className="text-gray-500 mt-2">

                                    📍 {p.lat.toFixed(4)}, {p.long.toFixed(4)}

                                </p>






                                <p className="mt-2">

                                    Reported By:


                                    <span className="font-semibold ml-2">

                                        {p.reportedBy?.firstname}

                                    </span>


                                </p>







                                <span

                                    className={

                                        `inline-block mt-3 px-3 py-1 rounded-full text-sm

                                        ${
                                            p.status === "resolved"

                                            ? "bg-green-100 text-green-700"


                                            : p.status === "important"

                                            ? "bg-red-100 text-red-700"


                                            : p.status === "completed"

                                            ? "bg-blue-100 text-blue-700"


                                            : "bg-yellow-100 text-yellow-700"
                                        }`

                                    }

                                >


                                    {p.status}


                                </span>









                                {/* ACTION BUTTONS */}


                                <div className="flex gap-3 mt-5 flex-wrap">





                                    <button

                                        disabled={
                                            p.status === "important"
                                        }


                                        onClick={() =>
                                            updateStatus(
                                                p._id,
                                                "important"
                                            )
                                        }


                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"

                                    >

                                        Important

                                    </button>







                                    {/* <button

                                        disabled={
                                            p.status === "completed"
                                        }


                                        onClick={() =>
                                            updateStatus(
                                                p._id,
                                                "completed"
                                            )
                                        }


                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"

                                    >

                                        Completed

                                    </button> */}







                                    <button

                                        disabled={
                                            p.status === "resolved"
                                        }


                                        onClick={() =>
                                            updateStatus(
                                                p._id,
                                                "resolved"
                                            )
                                        }


                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"

                                    >

                                        Resolved

                                    </button>








                                    <button


                                        onClick={() =>
                                            deleteReport(
                                                p._id
                                            )
                                        }


                                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black"

                                    >

                                        Delete

                                    </button>





                                </div>



                            </div>



                        </div>


                    ))

                }


            </div>


        </div>

    );

};