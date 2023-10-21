<template>
    <div class="block">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="limit"
            layout="sizes, prev, pager, next, jumper"
            :total="total"
            :disabled="total === 0"
        >
        </el-pagination>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    total: {
        type: Number,
        default: 0,
    },
});

const emits = defineEmits(['change']);

const limit = ref(40);
const page = ref(0);

const handleSizeChange = (value: number) => {
    limit.value = value;
    emits('change', getReturnData());
};

const handleCurrentChange = () => {
    emits('change', getReturnData());
};

const getReturnData = () => {
    const offset = (page.value - 1) * limit.value;
    return {
        offset: offset < 0 ? 0 : offset,
        limit: limit.value,
    };
};

watch(
    () => props.total,
    () => {
        if (page.value > 0 && page.value * limit.value > props.total) {
            page.value = Math.ceil(props.total / limit.value);
        }
    }
);
</script>

<style scoped>
.el-pagination {
    display: flex !important;
    justify-content: space-between !important;
}
</style>