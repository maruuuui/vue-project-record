<script lang="ts" setup>

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
                <tr v-for="record,idx in records" :key="record.id">
                    <th scope="row">{{idx}}</th>
                    <td>{{record.start}}</td>
                    <td>{{record.end}}</td>
                    <td>{{record.projectName}}</td>
                    <td>{{record.projectDetail}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>