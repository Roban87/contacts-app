import * as React from 'react';
import { useEffect, useId } from 'react';
import * as ReactDOM from 'react-dom';

export interface TriggerProps {
    modalId: string;
    trigger: React.JSX.Element;
    toggleModal: () => void;
}

export interface ContentProps {
    modalId: string;
    modalContent: React.JSX.Element;
    toggleModal: () => void;
    className?: string | undefined;
    col?: any;
}

export interface ModalProps {
    trigger?: React.JSX.Element;
    isOpen: boolean;
    modalContent: React.JSX.Element;
    toggleModal: () => void;
    disabled?: boolean;
    className?: string;
    col?: any;
}

export default function Modal({ trigger, isOpen, modalContent, toggleModal, disabled, className, col }: ModalProps) {
    const modalId = useId();

    return <div modal-id={modalId} className={'modal'}>
        {trigger && <Trigger
            modalId={modalId}
            trigger={trigger}
            toggleModal={toggleModal}
        />}

        {isOpen && <Content
            modalId={modalId}
            modalContent={modalContent}
            toggleModal={toggleModal}
            className={className}
            col={col}
        />}
    </div>;
}

function Trigger({ modalId, trigger, toggleModal }: TriggerProps) {

    return <div modal-trigger-id={modalId}
                className={'modal-trigger'} onClick={() => toggleModal()}>
        {trigger}
    </div>;
}

function Content({ modalId, modalContent, toggleModal, className, col }: ContentProps) {

    return ReactDOM.createPortal(
        <div modal-content-id={modalId}
             onClick={() => toggleModal()}
             className={`modal-content-wrapper row ${!!className ? className : ''}`}>
            <div className={`modal-content p-4 col-md-${col?.md || 12} col-lg-${col?.lg || 10} col-${col?.xs || 24}`}
                 onClick={(e) => e.stopPropagation()}>

                <div className="modal-content-body">
                    {modalContent}
                </div>
            </div>
        </div>,
        document.body);
}
