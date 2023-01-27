<script lang="ts" setup>
import { ref, onMounted, type Ref } from "vue";

import { getProjectRecords } from "@/util/api";
import type { ProjectRecord } from "@/types";

const records: Ref<ProjectRecord[]> = ref([]);

onMounted(async () => {
  records.value = await getProjectRecords();
});
</script>

<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr class="table-secondary">
          <th scope="col">No.</th>
          <th scope="col">開始</th>
          <th scope="col">終了</th>
          <th scope="col">案件概要</th>
          <th scope="col">案件詳細</th>
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
        </tr>
      </tbody>
    </table>
  </div>
</template>
