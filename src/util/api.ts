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
      throw Error("接続に失敗しました");
    }

    const items = res.data;
    const dataArray: ProjectRecord[] = [];
    for (const item of items) {
      dataArray.push({
        id: item.id,
        startDate: item.start_date,
        endDate: item.end_date,
        projectAbstract: item.project_abstract,
        projectDetail: item.project_detail,
      });
    }

    return dataArray;
  } catch (err) {
    console.log(err);
    throw Error("接続に失敗しました");
  }
}

export async function postProjectRecord(
  projectRecord: Omit<ProjectRecord, "id">
) {
  type PostProjectRecordsRequest = {
    start_date: string;
    end_date: string;
    project_abstract: string;
    project_detail: string;
    member_id: number;
  };
  const postData = {
    start_date: projectRecord.startDate,
    end_date: projectRecord.endDate,
    project_abstract: projectRecord.projectAbstract,
    project_detail: projectRecord.projectDetail,
    member: 1,
  };
  console.log(postData);

  try {
    const res = await axios.post<PostProjectRecordsRequest>(url, postData, {
      headers: requestHeader,
    });
    if (res.status < 200 || res.status >= 400) {
      throw Error("接続に失敗しました");
    }

    return res;
  } catch (err) {
    console.log(err);
    throw Error("接続に失敗しました");
  }
}

export async function updateProjectRecord(projectRecord: ProjectRecord) {
  type UpdateProjectRecordRequest = {
    start_date: string;
    end_date: string;
    project_abstract: string;
    project_detail: string;
    member: number;
  };

  const id = projectRecord.id;
  const data: UpdateProjectRecordRequest = {
    start_date: projectRecord.startDate,
    end_date: projectRecord.endDate,
    project_abstract: projectRecord.projectAbstract,
    project_detail: projectRecord.projectDetail,
    member: 1,
  };

  try {
    const res = await axios.put(`${url}${id}/`, data, {
      headers: requestHeader,
    });
    if (res.status < 200 || res.status >= 400) {
      throw Error("接続に失敗しました");
    }

    return res;
  } catch (err) {
    console.log(err);
    throw Error("接続に失敗しました");
  }
}
export async function deleteProjectRecord(id: number) {
  try {
    const res = await axios.delete(`${url}${id}/`, {
      headers: requestHeader,
    });
    if (res.status < 200 || res.status >= 400) {
      throw Error("接続に失敗しました");
    }

    return res;
  } catch (err) {
    console.log(err);
    throw Error("接続に失敗しました");
  }
}
