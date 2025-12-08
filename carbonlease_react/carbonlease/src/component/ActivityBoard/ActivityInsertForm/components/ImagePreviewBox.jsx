import { PreviewArea, PreviewImage, EmptyText } from "../ActivityInsertForm.styles";

export default function ImagePreviewBox({ file, origin }) {
  if (file instanceof File) {
    const src = URL.createObjectURL(file);
    return (
      <PreviewArea>
        <PreviewImage src={src} alt="preview" />
      </PreviewArea>
    );
  }
  if (origin) {
    return (
      <PreviewArea>
        <PreviewImage src={origin} alt="origin" />
      </PreviewArea>
    );
  }
  return (
    <PreviewArea>
      <EmptyText>📁 업로드할 이미지를 선택해주세요.</EmptyText>
    </PreviewArea>
  );
}
