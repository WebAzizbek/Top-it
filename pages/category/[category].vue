<template>
    <!-- <pre>{{ cat }}</pre> -->
    <div class="cat">
        <div class="container">
            <div class="product__top-nav cat__top-nav">
                <p class="product__top-nav-text">Главная</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#626364" stroke-width="2" />
                </svg>
                <p class="product__top-nav-text">Каталог товаров</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#626364" stroke-width="2" />
                </svg>
                <p class="product__top-nav-text">{{ cat?.data.subCategory.title }}</p>
            </div>
            <div class="cat__brand">
                <div class="cat__brand-wrapper">
                    <p class="cat__brand-text">Известные бренды</p>
                    <div>
                        <div v-for="b in cat?.data.brands" :key="b" class="cat__brand-item">{{ b.name }}</div>
                    </div>
                </div>
                <div class="cat__brand-count">Товаров 36 из 328</div>
            </div>
            <div class="cat__res-filter">
                <div class="cat__res-filter-item">
                    <img src="~/assets/image/svg/Filter.svg" alt="fILTER" width="24" height="24">
                    <p class="cat__res-filter-text">Фильтры</p>
                </div>
                <select class="cat__res-filter-select">
                    <option class="cat__res-filter-option" selected disabled>Сортировать</option>
                    <option class="cat__res-filter-option">По цене</option>
                    <option class="cat__res-filter-option">По популярности</option>
                    <option class="cat__res-filter-option">По алфавиту</option>
                    <option class="cat__res-filter-option">По новизне</option>
                    <option class="cat__res-filter-option">Акции</option>
                </select>
            </div>
            <div class="cat__feature">
                <div class="cat__feature-wrapper">
                    <div class="cat__feature-item">
                        <img src="~/assets/image/svg/Database.svg" alt="Database" width="22" height="22">
                        <p class="cat__feature-item-text">По цене</p>
                    </div>
                    <div class="cat__feature-item">
                        <img src="~/assets/image/svg/Star_duotone.svg" alt="Database" width="24" height="24">
                        <p class="cat__feature-item-text">По популярности</p>
                    </div>
                    <div class="cat__feature-item">
                        <img src="~/assets/image/svg/Aa.svg" alt="Aa" width="24" height="40">
                        <p class="cat__feature-item-text">По алфавиту</p>
                    </div>
                    <div class="cat__feature-item">
                        <img src="~/assets/image/svg/Arrow_top.svg" alt="Arrow Top" width="24" height="24">
                        <p class="cat__feature-item-text">По новизне</p>
                    </div>
                    <div class="cat__feature-item">
                        <img src="~/assets/image/svg/Percent.svg" alt="Percent" width="24" height="24">
                        <p class="cat__feature-item-text">Акции</p>
                    </div>
                </div>
                <div class="cat__feature-product">
                    <div class="cat__feature-product-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="4" width="6" height="6" rx="1" stroke="white" stroke-width="2"
                                stroke-linejoin="round" />
                            <rect x="4" y="14" width="6" height="6" rx="1" stroke="white" stroke-width="2"
                                stroke-linejoin="round" />
                            <rect x="14" y="14" width="6" height="6" rx="1" stroke="white" stroke-width="2"
                                stroke-linejoin="round" />
                            <rect x="14" y="4" width="6" height="6" rx="1" stroke="white" stroke-width="2"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div class="cat__feature-product-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="5" width="16" height="5" rx="1" stroke="#626364" stroke-width="2"
                                stroke-linejoin="round" />
                            <rect x="4" y="14" width="16" height="5" rx="1" stroke="#626364" stroke-width="2"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="cat__product">
                <div class="cat__filter">
                    <div class="cat__filter-top">
                        <p class="cat__filter-top-text">Выбранные фильтры</p>
                        <div class="cat__filter-top-item-wrapper">
                            <div v-for="f in 6" :key="f" class="cat__filter-top-item">
                                <p class="cat__filter-top-item-text">Lg</p>
                                <img src="~/assets/image/svg/x.svg" alt="close" width="24" height="24">
                            </div>
                        </div>
                        <button class="cat__filter-clear-btn">Очистить все</button>
                    </div>
                </div>
                <div class="cat__pr-wrapper">
                    <div v-for="p in cat?.data.products.items" :key="p" class="interest__item">
                        <product-card :p="p"/>
                    </div>
                </div>
            </div>
            <div class="cat__text">
                <div class="cart__text-item">
                    <div  class="car__text-item-dropdown-top">
                        <h3 class="cart__text-item-title">Где купить надежный смартфон?</h3>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#8F8E94" stroke-width="2" />
                        </svg>
                    </div>
                    
                    <Transition name="text-bot">
                        <div class="cart__text-dropdown-bottom">
                        <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem
                            Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а
                            также реальное распределение букв и пробелов в абзацах, которое не получается при простой
                            дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
                            вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по
                            ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего
                            настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии
                            появились по ошибке, некоторые - намеренно (например, юмористические варианты).

                            Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem
                            Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а
                            также реальное распределение букв и пробелов в абзацах, которое не получается при простой
                            дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
                            вёрстки и редакторы</p>
                    </div>
                    </Transition>
                </div>
                <div class="cart__text-item">
                    <div @click="textOpen" class="car__text-item-dropdown-top">
                        <h3 class="cart__text-item-title">Какие проблемы решают смартфоны?</h3>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#8F8E94" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="cart__text-dropdown-bottom">
                        <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem
                            Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а
                            также реальное распределение букв и пробелов в абзацах, которое не получается при простой
                            дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
                            вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по
                            ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего
                            настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии
                            появились по ошибке, некоторые - намеренно (например, юмористические варианты).

                            Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem
                            Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а
                            также реальное распределение букв и пробелов в абзацах, которое не получается при простой
                            дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
                            вёрстки и редакторы</p>
                    </div>
                </div>
                <div class="cart__text-item">
                    <div @click="textOpen" class="car__text-item-dropdown-top">
                        <h3 class="cart__text-item-title">Какие проблемы решают смартфоны?</h3>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#8F8E94" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="cart__text-dropdown-bottom">
                        <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem
                            Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а
                            также реальное распределение букв и пробелов в абзацах, которое не получается при простой
                            дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
                            вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по
                            ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего
                            настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии
                            появились по ошибке, некоторые - намеренно (например, юмористические варианты).

                            Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem
                            Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а
                            также реальное распределение букв и пробелов в абзацах, которое не получается при простой
                            дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
                            вёрстки и редакторы</p>
                    </div>
                </div>
                <div class="cart__text-item">
                    <div @click="textOpen" class="car__text-item-dropdown-top">
                        <h3 class="cart__text-item-title">Где купить надежный смартфон?</h3>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#8F8E94" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="cart__text-dropdown-bottom">
                        <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem
                            Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а
                            также реальное распределение букв и пробелов в абзацах, которое не получается при простой
                            дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
                            вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по
                            ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего
                            настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии
                            появились по ошибке, некоторые - намеренно (например, юмористические варианты).

                            Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem
                            Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а
                            также реальное распределение букв и пробелов в абзацах, которое не получается при простой
                            дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
                            вёрстки и редакторы</p>
                    </div>
                </div>
            </div>
    </div>
</div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig().public
const { data: cat } = useFetch(config.baseUrl + '/product-manager/product/category?key=' + route.params.category)

// const textOpen = (e) => {
//     e.target.nextElementSibling.classList.toggle('cat__open-text')
// }

onMounted(() => {
    const items = document.querySelectorAll('.cart__text-item')
    items.forEach(item => {
        item.addEventListener('click', ()=> {
            items.forEach(elem => {
                if(elem !== item) elem.classList.remove('cat__open-text')
            })
            item.classList.toggle('cat__open-text')
        })
    })
})

</script>

<style lang="scss">
.text-bot-enter-active,
.text-bot-leave-active {
    transition: all 0.5s;

}

.text-bot-enter-from,
.text-bot-leave-to {
    transition: all 0.5s;
    opacity: 0;
}
</style>
