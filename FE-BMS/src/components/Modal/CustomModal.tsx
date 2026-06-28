import { CloseOutlined } from '@mui/icons-material';
import { IconButton, Modal, Stack } from '@mui/material';

import { ModalContainer } from './CustomModal.styles';
import { CustomModalProps } from './Modal.types';

/**
 * This component display the modal component
 * @param open - State to toggle mode of modal
 * @param onClose - Function to close modal
 * @param children - Content to be render inside modal
 */
export const CustomModal = ({ open, onClose, children }: CustomModalProps) => (
    <Modal open={open} onClose={onClose}>
        <ModalContainer>
            <Stack>
                <IconButton
                    aria-label="Close modal"
                    sx={{ width: 'fit-content', alignSelf: 'flex-end' }}
                    onClick={onClose}
                >
                    <CloseOutlined />
                </IconButton>
                {children}
            </Stack>
        </ModalContainer>
    </Modal>
);
