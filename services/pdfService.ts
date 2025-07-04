// services/pdfService.ts
import { PdfSettings, PickedDocument } from '@/types/modal';

export class PdfService {
    static async mergePdfFiles(files: PickedDocument[], settings: PdfSettings): Promise<string> {
        try {
            // Implementa la logica di merge
            return 'merged-file-path';
        } catch (error) {
            throw new Error(`Error merging PDFs: ${error}`);
        }
    }

    static validateSettings(settings: PdfSettings): boolean {
        if (settings.isLocked && !settings.password) {
            throw new Error('Password required for protected PDF');
        }
        return true;
    }
}