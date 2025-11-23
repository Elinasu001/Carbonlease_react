import { FloatingLabel } from "react-bootstrap";
import { Section } from "../../ActivityBoard/ActivityBoardDetail/ActivityBoardDetail.styles";


const BoardReply = ({ data = [] }) => {
   
    return (
        <>
        
        { data.length === 0 ? (
            
            <Section>
                <div style={{ padding:"10px", textAlign:"center", color:"#777" }}>
                  아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬
                </div>
            </Section> 
        ) : (
            data.map((reply) => ( 
                
               <div style={{
                    padding:"14px 10px",
                    borderBottom:"1px solid #eee",
                    fontSize:"14px"}}> <br />

                     <div> 작성자 : {reply.nickname} / {reply.enrollDate} <br /></div>
                           댓  글 : {reply.replyContent}
                </div>
                    
            ))
            )
        }
            </>
    )
    
}


export default BoardReply