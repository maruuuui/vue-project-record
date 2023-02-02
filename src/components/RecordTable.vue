<script lang="ts" setup>
import { onMounted, type Ref } from "vue";

import { deleteProjectRecord } from "@/util/api";
import type { ProjectRecord } from "@/types";

interface Props {
  records: Ref<ProjectRecord[]>;
  openEditRecordModal: (projectRecord: ProjectRecord) => void;
  fetchRecords: () => Promise<void>;
}

const props = defineProps<Props>();

async function onEditButtonClick(record: ProjectRecord) {
  console.log(`id:${record.id}の編集ボタンが押下されたよ`);
  props.openEditRecordModal(record);
}

async function onDeleteButtonClick(id: number) {
  console.log(`id:${id}の削除ボタンが押下されたよ`);
  await deleteProjectRecord(id);
  await props.fetchRecords();
}

onMounted(async () => {
  await props.fetchRecords();
});
</script>

<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr class="table-secondary">
          <th scope="col">No.</th>
          <th scope="col">開始</th>
          <th scope="col">終了</th>
          <th scope="col">案件概要</th>
          <th scope="col">案件詳細</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, idx) in props.records.value" :key="record.id">
          <th scope="row">{{ idx }}</th>
          <td>{{ record.startDate }}</td>
          <td>{{ record.endDate }}</td>
          <td>{{ record.projectAbstract }}</td>
          <td>
            <template
              v-for="(str, strIdx) in record.projectDetail.split('\n')"
              :key="record.id + '-' + strIdx"
            >
              {{ str }}
              <br />
            </template>
          </td>
          <td>
            <button
              class="btn btn-sm btn-primary"
              @click="onEditButtonClick(record)"
            >
              編集
            </button>
            <button
              class="btn btn-sm btn-warning"
              @click="onDeleteButtonClick(record.id)"
              style="margin-left: 5px"
            >
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
