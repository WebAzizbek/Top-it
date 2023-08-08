<template>
    <div class="overlay" @click="removeOverlay()" v-if="overlay"></div>
    <div class="hero">
        <Swiper :autoplay="{
            delay: 3000,
        }" :speed="1500" :modules="modules" :navigation="{
    nextEl: '.hero__next',
    prevEl: '.hero__prev'
}" :loop="true" class="hero__swiper">
            <SwiperSlide v-for="s in 4" :key="s">
                <div class="hero-img1">
                    <div class="container">
                        <div class="hero__text-wrapper">
                            <h1 class="hero__title">iPhone 14 pro max</h1>
                            <p class="hero__text">5G speed. A14 Bionic, the fastest chip in a smartphone.
                                An edge-to-edge OLED display.
                                Ceramic Shield with four times
                                better drop performance. And Night mode on every camera.
                                iPhone 12 has it all — in two perfect sizes.</p>
                            <button class="hero__btn">
                                <p>Купить iPhone 14</p>
                            </button>
                        </div>
                        <img class="hero__img" src="~/assets/image/png/iphone.png" alt="phone" width="1196" height="446">
                        <img class="hero__img-1" src="~/assets/image/svg/hero1.svg" alt="circle">
                        <img class="hero__img-2" src="~/assets/image/svg/hero2.svg" alt="circle">
                        <img class="hero__img-3" src="~/assets/image/svg/hero3.svg" alt="circle">
                    </div>
                </div>
            </SwiperSlide>
            <div class="hero__prev">
                <img src="~/assets/image/svg/prev.svg" alt="prev" width="24" height="24">
            </div>
            <div class="hero__next">
                <img src="~/assets/image/svg/next.svg" alt="prev" width="24" height="24">
            </div>
        </Swiper>

    </div>

    <div class="category">
        <div class="container">
            <h3 class="category__title site-title">Категории</h3>
            <div class="category__swiper-wrapper">
                <Swiper class="category__wrapper" :slidesPerView="4" :breakpoints="{
                    0: {
                        slidesPerView: 1
                    },
                    635: {
                        slidesPerView: 1
                    },
                    635: {
                        slidesPerView: 2
                    },
                    900: {
                        slidesPerView: 2
                    },
                    900: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 3
                    },
                    1200: {
                        slidesPerView: 3
                    },
                    1200: {
                        slidesPerView: 4
                    },
                    1300: {
                        slidesPerView: 4
                    }
                }" :spaceBetween="10" :modules="modules" :navigation="{
    nextEl: '.category__next',
    prevEl: '.category__prev'
}">
                    <SwiperSlide v-for="c in category?.data" :key="c" class="category__item">
                        <img class="category__img" :src="c.imageUrl" alt="" width="110" height="84">
                        <NuxtLink :to="`/category/${c.slug}`" class="category__text">{{ c.title }}</NuxtLink>
                    </SwiperSlide>

                    <div class="category__prev">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 18L7 12L13 5.99997" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="category__next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5.99997L17 12L11 18" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                </Swiper>
            </div>
        </div>
    </div>

    <div class="shares" v-if="sale?.status === 200">
        <div class="container">
            <div class="shares__title site-title">Выгодные акции</div>
            <div class="shares__swiper-wrapper">
                <Swiper class="shares__wrapper" :slidesPerView="5" :breakpoints="{
                    0: {
                        slidesPerView: 1
                    },
                    550: {
                        slidesPerView: 1
                    },
                    550: {
                        slidesPerView: 2
                    },
                    850: {
                        slidesPerView: 2
                    },
                    850: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 4
                    },
                    1100: {
                        slidesPerView: 4
                    },
                    1300: {
                        slidesPerView: 5
                    }
                }" :spaceBetween="10" :modules="modules" :navigation="{
    nextEl: '.shares__next',
    prevEl: '.shares__prev'
}">
                    <SwiperSlide v-for="s in sale.data" :key="s" class="shares__item">
                        <div class="shares__img-wrapper">
                            <span>50%</span>
                            <img :src="s.imageUrl" alt="" width="154" height="169">
                        </div>
                        <p class="shares__text">{{ s.title }}</p>
                        <!-- <NuxtLink :to="`/product/${p.url}`" class="shares__text">{{ s.title }}
                        </NuxtLink> -->
                    </SwiperSlide>
                    <div class="shares__prev">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 18L7 12L13 5.99997" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="shares__next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5.99997L17 12L11 18" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                </Swiper>
            </div>
        </div>
    </div>
    <div v-else class="container">
        <h1 class="site__emty-title">Выгодные акции не найдено</h1>
    </div>

    <div v-if="newProducts.status === 200" class="interest-1">
        <div class="container">
            <h3 class="interest__title site-title">Может заинтересовать</h3>
            <div class="interest__swiper-wrapper">
                <Swiper class="interest__wrapper" :slidesPerView="5" :modules="modules" :breakpoints="{
                    0: {
                        slidesPerView: 'auto',
                        freeMode: true,
                    },
                    1000: {
                        slidesPerView: 4
                    },
                    1100: {
                        slidesPerView: 4
                    },
                    1300: {
                        slidesPerView: 5
                    }
                }" :spaceBetween="10" :navigation="{
    nextEl: '.interest__next',
    prevEl: '.interest__prev'
}">
                    <SwiperSlide v-for="p in newProducts.data" :key="p" class="interest__item">
                        <product-card :p="p" />
                    </SwiperSlide>
                    <div class="interest__prev">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 18L7 12L13 5.99997" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="interest__next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5.99997L17 12L11 18" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                </Swiper>
            </div>
        </div>
    </div>
    <div v-else class="container">
        <h1 class="site__emty-title">Может заинтересовать не найдено</h1>
    </div>

    <div v-if="famous?.status === 200" class="interest famous">
        <div class="container">
            <h3 class="famous__title interest__title site-title">Хиты продаж</h3>
            <div class="interest__swiper-wrapper">
                <Swiper class="interest__wrapper famous__wrapper" :slidesPerView="5" :breakpoints="{
                    0: {
                        slidesPerView: 1
                    },
                    550: {
                        slidesPerView: 1
                    },
                    550: {
                        slidesPerView: 2
                    },
                    850: {
                        slidesPerView: 2
                    },
                    850: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 4
                    },
                    1100: {
                        slidesPerView: 4
                    },
                    1300: {
                        slidesPerView: 5
                    }
                }" :spaceBetween="10" :modules="modules" :navigation="{
    nextEl: '.interest__next',
    prevEl: '.interest__prev'
}">
                    <SwiperSlide v-for="p in famous.data" :key="p" class="interest__item famous__item">
                        <product-card :p="p" />
                    </SwiperSlide>
                    <div class="interest__prev famous__prev">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 18L7 12L13 5.99997" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="interest__next famous__next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5.99997L17 12L11 18" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                </Swiper>
            </div>
        </div>
    </div>
    <div v-else class="container">
        <h1 class="site__emty-title">Хиты продаж не найдено</h1>
    </div>

    <div class="interest-2 new">
        <div class="container">
            <h3 class="new__title interest__title site-title">Новинки</h3>
            <div class="interest__swiper-wrapper">
                <h1 v-if="pendingProducts">Loading interesting products</h1>
                <Swiper v-else class="interest__wrapper new__wrapper" :slidesPerView="5" :breakpoints="{
                    0: {
                        slidesPerView: 1
                    },
                    550: {
                        slidesPerView: 1
                    },
                    550: {
                        slidesPerView: 2
                    },
                    850: {
                        slidesPerView: 2
                    },
                    850: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 4
                    },
                    1100: {
                        slidesPerView: 4
                    },
                    1300: {
                        slidesPerView: 5
                    }
                }" :spaceBetween="10" :modules="modules" :navigation="{
    nextEl: '.interest__next',
    prevEl: '.interest__prev'
}">
                    <SwiperSlide v-for="p in products.data" :key="p" class="interest__item new__item">
                        <product-card :p="p" />
                    </SwiperSlide>
                    <div class="interest__prev new__prev">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 18L7 12L13 5.99997" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="interest__next new__next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5.99997L17 12L11 18" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                </Swiper>
            </div>
        </div>
    </div>

    <div v-if="appleProducts?.status === 200" class="interest apple">
        <div class="container">
            <h3 class="apple__title interest__title site-title">Техника Apple</h3>
            <div class="interest__swiper-wrapper">
                <Swiper class="interest__wrapper apple__wrapper" :slidesPerView="5" :breakpoints="{
                    0: {
                        slidesPerView: 1
                    },
                    550: {
                        slidesPerView: 1
                    },
                    550: {
                        slidesPerView: 2
                    },
                    850: {
                        slidesPerView: 2
                    },
                    850: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 4
                    },
                    1100: {
                        slidesPerView: 4
                    },
                    1300: {
                        slidesPerView: 5
                    }
                }" :spaceBetween="10" :modules="modules" :navigation="{
    nextEl: '.interest__next',
    prevEl: '.interest__prev'
}">
                    <SwiperSlide v-for="p in appleProducts.data" :key="p" class="interest__item apple__item">
                        <product-card :p="p" />
                    </SwiperSlide>
                    <div class="interest__prev apple__prev">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 18L7 12L13 5.99997" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="interest__next apple__next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5.99997L17 12L11 18" stroke="#808080" stroke-width="2" />
                        </svg>
                    </div>
                </Swiper>
            </div>
        </div>
    </div>
    <div v-else class="container">
        <h1 class="site__emty-title">Техника Apple не найдено</h1>
    </div>

    <div class="work">
        <div class="container">
            <h3 class="work__title site__emty-title">Как мы работаем</h3>
            <Swiper class="work__list" :slidesPerView="'auto'" :spaceBetween="10">
                <SwiperSlide class="work__item">
                    <img class="work__item-img" src="~/assets/image/png/shop.png" alt="shop" width="64" height="65">
                    <h4 class="work__item-title">Покупка в рассрочку</h4>
                    <p class="work__item-text">Удобная онлайн рассрочка
                        на товары бытовой техники в
                        ТОП-ИТ</p>
                </SwiperSlide>
                <SwiperSlide class="work__item">
                    <img class="work__item-img" src="~/assets/image/png/work-truck.png" alt="shop" width="64" height="65">
                    <h4 class="work__item-title">Бесплатная доставка</h4>
                    <p class="work__item-text">Условия доставки товаров в ТОП-ИТ</p>
                </SwiperSlide>
                <SwiperSlide class="work__item">
                    <img class="work__item-img" src="~/assets/image/png/security.png" alt="shop" width="64" height="65">
                    <h4 class="work__item-title">Гарантия на товары</h4>
                    <p class="work__item-text">Узнайте всё о гарантии и возврате товара интернет-магазина ТОП-ИТ</p>
                </SwiperSlide>
                <SwiperSlide class="work__item">
                    <img class="work__item-img" src="~/assets/image/png/gift.png" alt="shop" width="61" height="65">
                    <h4 class="work__item-title">Гарантия на товары</h4>
                    <p class="work__item-text">Узнайте всё о гарантии и возврате товара интернет-магазина ТОП-ИТ</p>
                </SwiperSlide>
                <SwiperSlide class="work__item">
                    <img class="work__item-img" src="~/assets/image/png/chat.png" alt="shop" width="64" height="65">
                    <h4 class="work__item-title">Помощь</h4>
                    <p class="work__item-text">Частые вопросы</p>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>

<script setup>
import 'swiper/css/free-mode';
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper';
import { useStore } from '~/stores/store.js';
import { addToLiked } from '~/options/savedLiked';
const store = useStore();
let modules = [Autoplay, Pagination, Navigation, FreeMode];

// const { data: products, pendingProducts } = useLazyAsyncData('products', () => $fetch(config.baseUrl + '/product-manager/product/newcomers?limit=12'))
// const { data: newProducts, pendingNewProducts } = useLazyAsyncData('newProducts', () => $fetch(config.baseUrl + '/product-manager/product/recommended?limit=12'))
// const { data: category, pendingCategory } = useLazyAsyncData('category', () => $fetch(config.baseUrl + '/product-manager/category/index'))
// const { data: sale, pendingSale } = useLazyAsyncData('sale', () => $fetch(config.baseUrl + '/product-manager/product/stocks'))
// const { data: famous, pendingFamous } = useLazyAsyncData('famous', () => $fetch(config.baseUrl + '/product-manager/product/bestseller?limit=12'))
// const { data: appleProducts, pendingAppleProducts } = useLazyAsyncData('appleProducts', () => $fetch(config.baseUrl + '/product-manager/product/bestseller?limit=12'))
const overlay = ref(false)

function removeOverlay() {
    overlay.value = false
}

const { locale } = useI18n()
const newProducts = ref([])
const products = ref([])

watchEffect(async () => {
    await $fetch('http://shop/api/product-manager/product/recommended?limit=12', {
        headers: {
            'Accept-Language': locale.value,
        }
    }).then(data => {
        newProducts.value = data
    })
    await $fetch('http://shop/api/product-manager/product/newcomers?limit=12', {
        headers: {
            'Accept-Language': locale.value,
        }
    }).then(data => {
        products.value = data
    })
})
const { data: category } = useFetch('http://shop/api/product-manager/category/index', {
    headers: {
        'Accept-Language': locale.value,
    },
})
const { data: sale } = useFetch('http://shop/api//product-manager/product/stocks', {
    headers: {
        'Accept-Language': locale.value,
    },
})
const { data: famous } = useFetch('http://shop/api/product-manager/product/bestseller?limit=12', {
    headers: {
        'Accept-Language': locale.value,
    },
})
const { data: appleProducts } = useFetch('http://shop/api/product-manager/product/bestseller?limit=12', {
    headers: {
        'Accept-Language': locale.value,
    },
})
const config = useRuntimeConfig().public;
// const { data: menu } = useFetch(config.baseUrl + '/product-manager/category/index');
</script>
<style lang="scss" >
.menu-enter-active,
.menu-leave-active {
    transition: all 0.5s;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 15;
}

.menu-enter-from,
.menu-leave-to {
    transition: all 0.5s;
    position: fixed;
    top: 0;
    left: -200%;

    z-index: 15;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
    transform: translateY(0);
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(-20%);
    opacity: 0;
}
</style>