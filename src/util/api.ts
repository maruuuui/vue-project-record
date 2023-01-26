import axios from "axios";
import type { ProjectRecord } from "@/types";

// デプロイ時にはawsのurlに差し替える
const url =
  typeof import.meta.env.VITE_BACKEND_HOST == "string"
    ? import.meta.env.VITE_BACKEND_HOST
    : "http://localhost:8000/projectDetail/";
const requestHeader = {
  "Content-Type": "application/json",
};
export async function getProjectRecords() {
  type GetProjectRecordsResponse = {
      id: number;
      start_date: string;
      end_date: string;
      project_abstract: string;
      project_detail: string;
    }[];
  try {
      const res = await axios.get<GetProjectRecordsResponse>(url);
      if (res.status < 200 || res.status >= 400) {
        throw Error("Albumの取得に失敗しました");
      }

      const items = res.data;
      const albumDataArray: ProjectRecord[] = [];
      for (const item of items) {
        albumDataArray.push({
          id: item.id,
          startDate: item.start_date,
          endDate: item.end_date,
          projectAbstract: item.project_abstract,
          projectDetail: item.project_detail,
        });
      }

      return albumDataArray;
    } catch (err) {
      console.log(err);
      throw Error("Albumの取得に失敗しました");
    }
}
