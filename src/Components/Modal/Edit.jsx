import { Modal, ModalBody } from 'flowbite-react'
import { useState, useEffect } from 'react'
import Input from '../Input/Input';
import { userAuth } from '../Context/Auth';
import { doc, updateDoc } from 'firebase/firestore';
import { fetchFromFirestore, fireStore } from '../Firebase/Firebase';


import fileUpload from '../../assets/fileUpload.svg';
import loading from '../../assets/loading.gif';
import close from '../../assets/close.svg'

const Edit = ({ toggleEditModal, status, setItems, ad }) => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('')
    const [image, setImage] = useState(null);

    const [submitting, setSubmitting] = useState(false)

    let auth = userAuth(); // context consuming

    const handleImageUpload = (e) => {
        if (e.target.files) setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth?.user) {
            alert('Please Login to Continue');
            return;
        }

        setSubmitting(true);

        const readImageAsDataUrl = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageUrl = reader.result
                    localStorage.setItem(`image_${File.name}`, imageUrl);
                    resolve(imageUrl);
                }
                reader.onerror = reject;
                reader.readAsDataURL(file);
            })
        }

        let imageUrl = '';
        if (image) {
            try {
                imageUrl = await readImageAsDataUrl(image);
            } catch (error) {

            }
        }

        const trimmedTitle = title.trim();
        const trimmedCategory = category.trim();
        const trimmedPrice = price.trim();
        const trimmedDescription = description.trim();
        const trimmedLocation = location.trim();

        if (!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription || !trimmedLocation) {
            alert('All fields are required');
            setSubmitting(false);
            return;
        }

        try {
            const docRef = doc(fireStore, 'products', ad.id);
            await updateDoc(docRef, {
                title,
                category,
                price,
                description,
                location,
                imageUrl: imageUrl || ad.imageUrl, 
            });

            const datas = await fetchFromFirestore();
            setItems(datas);
            toggleEditModal();
        } catch (error) {
            console.log(error);
            alert('Failed to add data firestore');
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        if (ad) {
            setTitle(ad.title || '');
            setCategory(ad.category || '');
            setPrice(ad.price || '');
            setDescription(ad.description || '');
            setLocation(ad.location || '');
            setImage(null);
        }
    }, [ad]);


    return (
        <div>
            <Modal theme={{
                content: {
                    base: 'relative w-full p-4 md:h-auto',
                    inner: 'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700'
                }
            }} onClick={toggleEditModal} show={status} className='bg-black' position={'center'} size='md' popup={true}>

                <ModalBody className='bg-white h-96 p-0 rounded-md' onClick={(e) => e.stopPropagation()}>

                    <img src={close} onClick={() => {
                        toggleEditModal();
                        setImage(null)
                    }} className='w-6 absolute z-10 top-6 right-8 cursor-pointer' alt="" />

                    <div className='p-6 pl-8 pr-8 pb-8'>
                        <p className='font-bold text-lg mb-3'>Edit Item</p>

                        <form onSubmit={handleSubmit}>
                            <Input value={title} setInput={setTitle} placeholder='Title' />
                            <Input value={category} setInput={setCategory} placeholder='Category' />
                            <Input value={price} setInput={setPrice} placeholder='Price' />
                            <Input value={description} setInput={setDescription} placeholder='Description' />
                            <Input value={location} setInput={setLocation} placeholder='Location' />

                            <div className='pt-2 w-full relative'>

                                {
                                    image ?
                                        <div className='relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden'>
                                            <img className='object-contain' src={URL.createObjectURL(image)} alt="" />
                                        </div>
                                        :
                                        <div className='relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md'>
                                            <input type="file"
                                                onChange={handleImageUpload}
                                                className='absolute inset-10 h-full w-full opacity-0 cursor-pointer z-30' />
                                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center'>
                                                <img className='w-12' src={fileUpload} alt="" />
                                                <p className="text-center text-sm pt-2">Click to upload images</p>
                                                <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                                            </div>
                                        </div>
                                }

                            </div>


                            {
                                submitting ?
                                    <div className='w-full flex h-14 justify-center pt-4 pb-2'>
                                        <img src={loading} className='w-32 object-cover' alt="" />
                                    </div>
                                    :
                                    <div className='w-full p-2'>
                                        <button
                                            className='w-full p-3 rounded-lg text-white'
                                            style={{ backgroundColor: '#002f34' }}
                                        >Update Item</button>
                                    </div>
                            }
                        </form>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default Edit