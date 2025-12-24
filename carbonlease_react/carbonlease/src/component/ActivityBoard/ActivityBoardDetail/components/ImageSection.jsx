import { ImageBox, ImageWrapper } from "../ActivityBoardDetail.styles";

const API_BASE_URL = window.ENV?.API_URL || 'http://localhost:80';

const ImageSection = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <ImageWrapper>
      <ImageBox>
        {images.map((src, idx) => (
          <img key={idx} src={`${src}`} alt="" />
        ))}
      </ImageBox>
    </ImageWrapper>
  );
};


export default ImageSection;