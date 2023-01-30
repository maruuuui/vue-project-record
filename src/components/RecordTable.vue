<script lang="ts" setup>
import { ref, onMounted, type Ref } from "vue";

import { getProjectRecords, deleteProjectRecord } from "@/util/api";
import type { ProjectRecord } from "@/types";

const records: Ref<ProjectRecord[]> = ref([]);

async function fetchRecords(){
  records.value = await getProjectRecords();
}


async function onEditButtonClick(id:number){
  console.log(`id:${id}の編集ボタンが押下されたよ`);
}

async function onDeleteButtonClick(id:number){
  console.log(`id:${id}の削除ボタンが押下されたよ`);
  await deleteProjectRecord(id)
  await fetchRecords()
}

onMounted(async () => {
  await fetchRecords()
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
        <tr v-for="(record, idx) in records" :key="record.id">
          <th scope="row">{{ idx }}</th>
          <td>{{ record.startDate }}</td>
          <td>{{ record.endDate }}</td>
          <td>{{ record.projectAbstract }}</td>
          <td>
            <span
              v-for="(str, strIdx) in record.projectDetail.split('\n')"
              :key="strIdx"
            >
              {{ str }}
              <br />
            </span>
          </td>
          <td>
            <button  class="btn btn-sm btn-primary" @click="onEditButtonClick(record.id)">編集</button>
            <button  class="btn btn-sm btn-warning" @click="onDeleteButtonClick(record.id)" style="margin-left: 5px">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
