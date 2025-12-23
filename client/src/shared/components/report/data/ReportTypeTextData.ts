import { ReportType } from "../../../constants/enums/ReportType";

export const REPORT_TYPE_TEXT_DATA: Record<
    ReportType,
    { title: string; desc: string }
> = {
    [ReportType.INAPPROPRIATE]: {
        title: "부적절한 콘텐츠",
        desc: "선정적이거나 불쾌감을 줄 수 있는 이미지 또는 제목"
    },
    [ReportType.SEXUAL]: {
        title: "성적인 콘텐츠",
        desc: "노골적인 성적 표현 또는 암시"
    },
    [ReportType.VIOLENCE]: {
        title: "폭력적이거나 혐오스러운 콘텐츠",
        desc: "폭력, 잔인한 장면 또는 혐오 표현 포함"
    },
    [ReportType.HATE_SPEECH]: {
        title: "욕설 및 혐오 발언",
        desc: "특정 대상에 대한 욕설, 모욕, 차별적 표현"
    },
    [ReportType.SPAM]: {
        title: "스팸 또는 광고",
        desc: "반복적인 홍보, 광고, 의미 없는 콘텐츠"
    },
    [ReportType.COPYRIGHT]: {
        title: "저작권 침해",
        desc: "허가 없이 사용된 영상, 이미지, 음악"
    },
    [ReportType.FALSE_INFO]: {
        title: "거짓 정보",
        desc: "사실과 다르거나 오해를 유발하는 내용"
    },
    [ReportType.PRIVACY]: {
        title: "개인정보 침해",
        desc: "타인의 개인정보가 무단으로 노출됨"
    },
    [ReportType.ILLEGAL]: {
        title: "불법적인 콘텐츠",
        desc: "법률을 위반하는 행위 또는 정보 포함"
    },
    [ReportType.ETC]: {
        title: "기타",
        desc: "위 항목에 해당하지 않는 문제"
    }
};
