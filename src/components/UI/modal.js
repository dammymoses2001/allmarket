import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import {FcEmptyTrash} from 'react-icons/fc'
function modal(props) {
    return (
        <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={props.show} onHide={props.handleClose} size='sm'>
        <Modal.Header closeButton>
          <Modal.Title><FcEmptyTrash fontSize={50}/> <span className='small'>{props.title}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            {props.cancel}
          </Button>
          <Button variant="danger " onClick={props.handleAction}>
           {props.action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default modal
