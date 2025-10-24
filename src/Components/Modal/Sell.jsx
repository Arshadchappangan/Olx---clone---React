import { Modal, ModalBody } from 'flowbite-react'
import React, { useState } from 'react'
import Input from '../Input/Input';
import { userAuth } from '../Context/Auth';
import { addDoc, collection } from 'firebase/firestore';
import { fireStore } from '../Firebase/Firebase';

const Sell = ({toggleSellModal,status}) => {

    const [title,setTitle] = useState('');
    const [category,setCategory] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');

    const [submitting,setSubmitting] = useState(false)

    let auth = userAuth(); // context consuming

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!auth?.user){
            alert('Please Login to Continue');
            return;
        }

        setSubmitting(true);

        const trimmedTitle = title.trim();
        const trimmedCategory = category.trim();
        const trimmedPrice = price.trim();
        const trimmedDescription = description.trim();

        if(!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription) {
            alert('All fields are required');
            setSubmitting(false);
            return;
        } 

        try {
            await addDoc(collection(fireStore,'products'),{
                title,
                category,
                price,
                description,
                userId : auth.user.uid,
                userName : auth.user.displayName || 'Untitled User',
                createdAt : new Date().toDateString()
            })
            toggleSellModal();
        } catch (error) {
            console.log(error);
            alert('Failed to add data firestore');
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <div>
      <Modal theme={{
        content : {
            base : 'relative w-full p-4 md:h-auto',
            inner : 'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700'
        }
      }} onClick={toggleSellModal} show={status} className='bg-black' position={'center'} size='md' popup={true}>

        <ModalBody className='bg-white h-96 p-0 rounded-md' onClick={(e) => e.stopPropagation()}>
            <div className='p-6 pl-8 pr-8 pb-8'>
                <p className='font-bold text-lg mb-3'>Sell Item</p>

                <form onSubmit={handleSubmit}>
                    <Input setInput={setTitle} placeholder='Title'/>
                    <Input setInput={setCategory} placeholder='Category'/>
                    <Input setInput={setPrice} placeholder='Price'/>
                    <Input setInput={setDescription} placeholder='Description'/>
                    {
                        submitting ?
                        <div>Processing...</div>
                        :
                        <button>Sell Item</button>
                    }
                </form>
            </div>
        </ModalBody>

      </Modal>
    </div>
  )
}

export default Sell