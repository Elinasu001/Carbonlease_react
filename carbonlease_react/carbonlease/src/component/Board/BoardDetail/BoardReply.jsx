import { Section } from "../../ActivityBoard/ActivityBoardDetail/ActivityBoardDetail.styles";


const BoardReply = ({ data = [] }) => {
   
    return (
        <>
        
        { data.length === 0 ? (
            <Section>
                <div style={{ padding:"20px", textAlign:"center", color:"#777" }}>
                  아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬
                </div>
            </Section>
        ) : (
            data.map((reply) => (
               <div>
                     댓글작성자 : {reply.nickname} 
                     댓글내용 : {reply.replyContent}
                </div>    
            ))
            )
        }
        </>
    )
}


export default BoardReply;