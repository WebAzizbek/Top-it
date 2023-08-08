<template>
    <div v-if="loading">
        <div class="loading">
        <div class="loading-wrapper">
            <!-- <img class="loading-img" src="./logo.svg" alt="" width="136" height="56"> -->
        </div>
        <div class="loading-circle"></div>
    </div>
    </div>
    
</template>

<script setup>
let nuxtApp = useNuxtApp();
let loading = ref(true);

nuxtApp.hook("page:start", () => {
    loading.value = false;
});
nuxtApp.hook("page:finish", () => {
    loading.value = false;
});
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

@mixin media($w) {
    @media (max-width: $w) {
        @content
    }
}

.loading {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}
.loading-wrapper {
    position: relative;
    z-index: 20;
    width: 200px;
    height: 200px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    @include media(1000px) {
        width: 150px;
        height: 150px;
    }
    @include media(700px) {
        width: 100px;
        height: 100px;
    }
    @include media(500px) {
        width: 100px;
        height: 100px;
    }
}
.loading-img {
    width: 130px;
    height: 130px;
    object-fit: contain;
    object-position: center;
    animation: loading-logo 2s ease infinite;
    @include media(1000px) {
        width: 80px;
        height: 80px;
    }
    @include media(700px) {
        width: 60px;
        height: 60px;
    }
    @include media(500px) {
        width: 50px;
        height: 50px;
    }
    @keyframes loading-logo {
        0% {
            transform: scale(1);
        }
        10% {
            transform: scale(1.1);
        }
        20% {
            transform: scale(1);
        }
    }
}
.loading-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 202px;
    height: 204px;
    border-radius: 50%;
    background: #2FB946;
    translate: -50% -50%;
    transform: rotate(0);
    @include media(1000px) {
        width: 152px;
        height: 154px;
    }
    @include media(700px) {
        width: 102px;
        height: 104px;
    }
    @include media(500px) {
        width: 102px;
        height: 104px;
    }
    animation: loading-circle 2s linear infinite;
    @keyframes loading-circle {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>