<script setup lang="ts">
interface Props {
  openCreateRecordModal: () => void;
}

const props = defineProps<Props>();

function openModal() {
  console.log("openModal");
  props.openCreateRecordModal();
}
const downloadPath = "http://localhost:8000/report/download";
</script>

<template>
  <div style="padding-bottom: 0.5em; display: inline-block">
    <button class="btn btn-primary" @click="openModal">+</button>
    <a :href="downloadPath" class="btn btn-primary" style="margin-left: 5px"
      >csv出力</a
    >
  </div>
</template>
