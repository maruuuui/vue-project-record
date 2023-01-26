import type { ProjectRecord } from "@/types";

// getProjectRecords実装までの仮の案件履歴
const records = [
    {
        id: 1,
        start: "2022/11/1",
        end: "2023/11/1",
        projectName: "hogehoge",
        projectDetail: "hogehogehogehogehogehoge"
    },
    {
        id: 2,
        start: "2021/11/1",
        end: "2022/11/1",
        projectName: "hugahuga",
        projectDetail: "hugahugahugahugahugahuga"
    },
]
export async function getProjectRecords() {
    return new Promise<ProjectRecord[]>((resolve) => { resolve(records) })
}