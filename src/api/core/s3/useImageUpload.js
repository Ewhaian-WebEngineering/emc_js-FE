import { useMutation } from '@tanstack/react-query';
import { getPresignedUrl, uploadToS3 } from './upload';
import { useToast } from '@/hooks/toast/useToast';

export const useImageUpload = (options = {}) => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file, imageType, ownerId }) => {
      const { uploadUrl, cdnUrl, fileKey } = await getPresignedUrl({
        imageType,
        ownerId,
        contentType: file.type,
      });
      await uploadToS3(uploadUrl, file);
      return { fileKey, cdnUrl };
    },
    onError: (error) => {
      let message = '이미지 업로드에 실패했어요';

      if (error.isS3Error) {
        message = '업로드 시간이 초과됐어요. 다시 시도해주세요';
      } else if (error.status === 403) {
        message = '이미지 업로드 권한이 없어요';
      } else if (error.status === 400 && error.code === 'VALIDATION_FAIL') {
        message = '이미지 형식이 올바르지 않아요';
      }

      toast({ message });
      options.onError?.(error);
    },
  });
};
