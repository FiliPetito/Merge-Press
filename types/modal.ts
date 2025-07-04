// types/modal.ts
export type PickedDocument = {
    id: string;
    mimeType: string;
    name: string;
    size: number;
    uri: string;
};

export type PdfSettings = {
    compression: 'high' | 'medium' | 'low';
    isLocked: boolean;
    password?: string;
    outputFileName: string;
    saveLocation?: string;
};


export type ModalData = {
    selectedFiles: PickedDocument[];
    initialSettings?: Partial<PdfSettings>;
};

export type ModalResult = {
    status: 'success' | 'cancelled' | 'error';
    settings?: PdfSettings;
    error?: string;
};