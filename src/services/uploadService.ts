import { apiFetch } from './api';

export const uploadService = {
  uploadImage: async (idToken: string, file: File, folder?: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) formData.append('folder', folder);

    const result = await apiFetch<{ url: string }>('/upload', {
      method: 'POST',
      idToken,
      body: formData,
      isFormData: true,
    });
    return result.url;
  },

  uploadImages: async (idToken: string, files: File[], folder?: string): Promise<string[]> => {
    return Promise.all(files.map((file) => uploadService.uploadImage(idToken, file, folder)));
  },
};
