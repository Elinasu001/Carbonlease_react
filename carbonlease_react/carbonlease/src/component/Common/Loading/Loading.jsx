import { LoadingContainer, LoadingText, Spinner } from './Loading.styled';

const Loading = ({ 
    message = '로딩 중...', 
    minHeight = '400px',
    size = '50px',
    fontSize = '16px'
}) => {
    return (
        <LoadingContainer $minHeight={minHeight}>
            <Spinner $size={size} />
            <LoadingText $fontSize={fontSize}>{message}</LoadingText>
        </LoadingContainer>
    );
};

export default Loading;
