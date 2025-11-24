import { activityInsertForm } from "../../../../api/activity/activityAPI";

export default function useInsertSubmit({
    title,
    content,
    address,
    lat,
    lng,
    regionNo,
    category,
    file,
    navigate
}) {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            alert("로그인이 필요한 서비스입니다!");
            navigate("/login");
            return;
        }

        if (!title) return alert("제목을 입력해주세요!");
        if (!content) return alert("내용을 입력해주세요!");
        if (!address || !lat || !lng) return alert("주소를 입력해주세요!");
        if (!regionNo || !category) return alert("지역 or 탄소절감 카테고리를 선택해주세요!");

        const activity = {
            title,
            content,
            address,
            lat,
            lng,
            certificationNo: category,
            regionNo
        };

        try {
            const res = await activityInsertForm(activity, file, accessToken);
            const activityNo = res.data.activityNo;

            alert("등록 성공!");
            navigate(`/activityBoards/${activityNo}`);
        } catch (err) {
            console.error(err);
            alert("등록 실패!");
        }
    };

    return { handleSubmit };
}