<template>
    <div class="container" style="margin-top: 140px; margin-bottom: 30px;">
        <div v-html="details?.data?.content"></div>
    </div>
</template>

<script setup>
const {locale} = useI18n()
const baseUrl = useRuntimeConfig().public.baseUrl;
const { urlValue } = useRoute().params
const details = ref([])
const getDetails = async () => {
    await $fetch(baseUrl + '/page-manager/page/detail', {
        method: 'POST',
        headers: {
            'Accept-Language': locale.value,
        },
        params: {
            key: urlValue
        }
    }).then(data => {
        details.value = data
    })
}
watchEffect(async () => {
    await getDetails()
})
</script>

<style lang="scss" scoped></style>