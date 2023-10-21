<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import emptyLayout from '@/layouts/emptyLayout.vue'
import mainLayout from '@/layouts/mainLayout.vue'

export default defineComponent({
    components: {
        emptyLayout,
        mainLayout
    },
    setup() {
        const route = useRoute()
        const layout = computed(() => route.meta.layout)

        return {
            layout
        }
    }
})
</script>

<style lang="scss">

body {
  margin: 0;
  padding: 0;
}

.app {
  height: max-content;
}

* {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif !important;
}

</style>
<script setup lang="ts">
</script>