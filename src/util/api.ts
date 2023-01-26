import type { ProjectRecord } from "@/types";

// getProjectRecords実装までの仮の案件履歴
const records = [
  {
    id: 1,
    startDate: "2022/11/1",
    endDate: "2023/11/1",
    projectAbstract: "hogehoge",
    projectDetail: "hogehogehogehogehogehoge",
  },
  {
    id: 2,
    startDate: "2021/11/1",
    endDate: "2022/11/1",
    projectAbstract: "hugahuga",
    projectDetail: "hugahugahugahugahugahuga",
  },
];
export async function getProjectRecords() {
  return new Promise<ProjectRecord[]>((resolve) => {
    resolve(records);
  });
}
