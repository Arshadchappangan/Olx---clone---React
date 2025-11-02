import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { fireStore } from "../Firebase/Firebase";
import download from '../../assets/dwnld.png'
import search from '../../assets/search1.svg'
import more from '../../assets/more.png'
import { getAuth } from "firebase/auth";
import Edit from '../Modal/Edit';
import Swal from "sweetalert2";

const MyAd = ({ toggleEditModal, status, selectedAd, setSelectedAd }) => {

    const [ads, setAds] = useState(null);
    const auth = getAuth();

    const filters = [
        { id: 'view-all', label: 'View all' },
        { id: 'active', label: 'Active Ads' },
        { id: 'inactive', label: 'Inactive Ads' },
        { id: 'pending', label: 'Pending Ads' },
        { id: 'moderated', label: 'Moderated Ads' },
    ];

    function formatDateFrom(date) {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: '2-digit'
        });
    }

    function formatDateTo(date) {
        date.setMonth(date.getMonth() + 1);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: '2-digit'
        });
    }

    const handleEditClick = (ad) => {
        setSelectedAd(ad);
        toggleEditModal();
    };

    useEffect(() => {
        const fetchItemsByUser = async () => {
            try {
                const productsCollection = collection(fireStore, 'products');
                const productSnapshot = await getDocs(productsCollection);
                const productList = productSnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(item => item.userId === auth?.currentUser?.uid);
                setAds(productList)
            } catch (error) {
                console.log(error)
            }
        }

        fetchItemsByUser();
    },[])

    const updateStatus = async (id) => {
        try {
            let docRef = doc(fireStore, 'products', id)
            await updateDoc(docRef, {
                isActive: false
            })
            setAds((prevAds) =>
                prevAds.map((ad) =>
                    ad.id === id ? { ...ad, isActive: false } : ad
                )
            );
        } catch (error) {
            console.log(error)
        }
    }

    const deleteAd = async (id) => {
        try {

            Swal.fire({
                title: "Are you sure?",
                text: "This ad will be permanently deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // delete document from Firestore
                        let docRef = doc(fireStore, 'products', id);
                        await deleteDoc(docRef);

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your ad has been deleted.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });

                        setAds(ads => ads.filter(ad => ad.id !== id))
                    } catch (error) {
                        console.error("Error deleting ad:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Delete failed",
                            text: error.message,
                        });
                    }
                }
            });


            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-end items-center mb-6">
                    <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
                        <img src={download} alt="" className='h-6' />
                        Download leads
                    </button>
                </div>

                {/* Promotion Banner */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-900">Want to sell more?</h3>
                        <p className="text-sm text-gray-600">Post more Ads for less. Save money with our packages.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition">
                        Show me packages
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="relative w-full border border-gray-300 rounded md:w-80 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <img src={search} className='h-6 ml-3' alt="" />
                            <input
                                type="text"
                                placeholder="Search by Ad Title"
                                className="w-full pl-6 pr-4 py-2 border-none "
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Filter By:</span>
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter.id === 'view-all'
                                        ? 'bg-blue-200 text-gray-700'
                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {filter.label}  {filter.id === 'view-all' && (
                                        <span className="ml-1">({ads?.length || 0})</span>
                                    )}

                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ads List */}
                {ads && ads.map((ad) => (
                    <div key={ad.id} className={`bg-white rounded-lg shadow-sm mb-4 border-l-4 ${ad?.isActive ? "border-blue-600" : "border-green-600"} w-full `}>
                        <div className="flex flex-col md:flex-row gap-4 p-6">

                            {/* Date Range */}
                            <div className="text-xs text-gray-600 md:w-1/8">
                                <div>FROM: {formatDateFrom(new Date(ad.createdAt))}</div>
                                <div>TO: {formatDateTo(new Date(ad.createdAt))}</div>
                            </div>

                            {/* Ad Image */}
                            <div className="w-24 h-24 flex-shrink-0">
                                <img src={ad?.imageUrl} alt={ad?.title} className="w-full h-full object-cover rounded" />
                            </div>

                            {/* Main Content */}
                            <div className="flex flex-col flex-grow justify-between">

                                {/* Top Row */}
                                <div className="flex flex-wrap items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">{ad?.title}</h3>
                                        <p className="text-sm text-gray-600">{ad?.category}</p>
                                    </div>

                                    <div className="font-semibold text-lg">{ad.price}</div>

                                    {ad?.isActive ? (
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">ACTIVE</span>
                                    ) : (
                                        <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">SOLD</span>
                                    )}

                                    {/* Live Status */}
                                    <div
                                        className={`flex items-center gap-2 mt-1 pl-2 h-8 w-1/6 border-l-2 bg-gray-200 ${ad?.isActive ? "border-blue-600" : "border-green-600"
                                            }`}
                                    >
                                        <span className="text-sm text-gray-700">
                                            {ad?.isActive ? "This ad is currently live" : "This ad was Sold"}
                                        </span>
                                    </div>
                                    <img src={more} className='w-6' alt="" />
                                </div>



                                {/* Footer */}
                                <div className="border-t border-gray-200 mt-4 pt-4 flex flex-wrap justify-between items-center">
                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                        <div>Views: {ad?.views || 0}</div>
                                        <div>Likes: {ad?.likes || 0}</div>
                                    </div>

                                    <div className="flex gap-3">
                                        {
                                            ad.isActive &&
                                            <>
                                                <button onClick={() => updateStatus(ad.id)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                                                    Mark as sold
                                                </button>
                                                <button onClick={() => handleEditClick(ad)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                                                    Edit
                                                </button>

                                            </>
                                        }
                                        <button onClick={() => deleteAd(ad.id)} className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                ))}
            </div>
            {
                status && <Edit toggleEditModal={toggleEditModal} status={status} ad={selectedAd} setItems={setAds} />
            }
        </div>
    )
}

export default MyAd
