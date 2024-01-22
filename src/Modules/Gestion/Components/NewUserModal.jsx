import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React from 'react'

const NewUserModal = ({ isOpen, onClose, idUser }) => {
  return (
    <AlertDialog
    motionPreset='slideInBottom'
    onClose={onClose}
    isOpen={isOpen}
    isCentered
  >
    <AlertDialogOverlay />

    <AlertDialogContent>
      <AlertDialogHeader>Operacion exitosa!!!</AlertDialogHeader>
      <AlertDialogCloseButton />
      <AlertDialogBody>
        El usuario ha sido creado exitosamente con el id: {idUser}. Recuerde que debe de cambiar su contraseña debido a que de momento no cuenta con contraseña.
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button colorScheme='green' onClick={onClose}>
          Aceptar
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default NewUserModal
