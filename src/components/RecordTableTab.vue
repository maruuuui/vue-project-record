<script setup lang="ts">
interface Props {
  openCreateRecordModal: () => void;
}

const props = defineProps<Props>();

function openModal() {
  console.log("openModal");
  props.openCreateRecordModal();
}
</script>

<template>
  <div style="padding-bottom: 0.5em; display: inline-block">
    <button class="btn btn-primary" @click="openModal">+</button>
    <button class="btn btn-primary" style="margin-left: 5px">レポート出力</button>
  </div>
</template>
