import { Modal } from 'flowbite-react'
import React from 'react'

const Sell = ({toggleSellModal,status}) => {
  return (
    <div>
      <Modal theme={{
        content : {
            base : 'relative w-full p-4 md:h-auto'
        }
      }} onClick={toggleSellModal} show={status}>

      </Modal>
    </div>
  )
}

export default Sell