// contexts/PdfModalContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { ModalData, ModalResult } from '@/types/modal';

interface PdfModalContextType {
    modalData: ModalData | null;
    modalResult: ModalResult | null;
    setModalData: (data: ModalData) => void;
    setModalResult: (result: any) => void;
    resetModal: () => void;
    setDeleteCallback?: (fn: () => void) => void;
    deleteCallback?: () => void;
}

const PdfModalContext = createContext<PdfModalContextType | undefined>(undefined);

export function PdfModalProvider({ children }: { children: React.ReactNode }) {
    const [modalData, setModalData] = useState<ModalData | null>(null);
    const [modalResult, setModalResult] = useState<ModalResult | null>(null);

    const [deleteCallback, setDeleteCallback] = useState<(() => void) | undefined>();

    const resetModal = () => {
        setModalData(null);
        setModalResult(null);
    };

    return (
        <PdfModalContext.Provider 
            value={{
                modalData,
                modalResult,
                setModalData,
                setModalResult,
                resetModal,
                setDeleteCallback,
                deleteCallback
            }}
        >
            {children}
        </PdfModalContext.Provider>
    );
}

export function usePdfModal() {
    const context = useContext(PdfModalContext);
    if (!context) {
        throw new Error('usePdfModal deve essere usato all\'interno di PdfModalProvider');
    }
    return context;
}