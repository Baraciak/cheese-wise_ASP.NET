import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const DeleteModal = (props) => {
  const {onDelete,
		 message, 
		 toggle, 
		 showModal} = props;


  return (
      	<Modal isOpen={showModal} toggle={toggle}>
        	<ModalBody>
          		{message}
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={toggle}>Close</Button>
				<Button color="danger" onClick={onDelete}>Delete</Button>
			</ModalFooter>
      	</Modal>
  );
}

export default DeleteModal;