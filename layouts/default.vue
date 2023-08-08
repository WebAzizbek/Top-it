<template>
    <header>
        <div class="overlay" @click="removeOverlay()" v-if="overlay"></div>
        <Transition name="menu">
            <div v-if="openMenu" class="menu__wrapper">
                <div class="menu">
                    <ul class="menu__list">
                        <button @click="openMenu = false, overlay = false">
                            <img class="mene__list-x-img" src="~/assets/image/svg/close.svg" alt="x" width="28" height="28">
                        </button>
                        <li v-for="menuItem in menu?.data" :key="menuItem.id" class="menu__item">
                            <div class="menu__item-wrapper">
                                <h2 class="menu__title">{{ menuItem.title }} </h2>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="#8F8E94" stroke-width="2" />
                                </svg>

                            </div>
                            <div class="sub-menu">
                                <ul class="sub-menu__list">
                                    <img class="sub-menu__x-btn" src="~/assets/image/svg/close.svg" alt="close" width="28"
                                        height="28">
                                    <li v-for="item in menuItem?.subCategories" :key="item.id" class="sub-menu__item">
                                        <p @click="openMenu = false, overlay = false">
                                            <NuxtLink :to="`/category/${item.slug}`">{{ item.title }}</NuxtLink>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Transition>

        <div class="header-top">
            <div class="container">
                <div class="header-top__wrapper">
                    <div class="languages">
                        <div class="default-language" @click="openLang = !openLang">
                            <img class="language-img" src="~/assets/image/svg/rus.svg" alt="RUS" width="14" height="14">
                            <p class="language-text">{{ locale }}</p>
                            <img class="language-arrow" src="~/assets/image/svg/arrow.svg" alt="ARROW" width="8" height="5">
                        </div>
                        <Transition name="fade">
                            <div class="language-wrapper" v-if="openLang">
                                <NuxtLink v-for="{ code, name } in locales" :key="code" :to="switchLocalePath(code)">{{ name
                                }}
                                </NuxtLink>
                            </div>
                        </Transition>
                    </div>
                    <div class="header-top__delivery">
                        <NuxtLink :to="`/nav/${item.urlValue}`" class="header-top__delivery-text site-text-hover"
                            v-for="item in headerMenu.data" :key="item">{{ item.name }}</NuxtLink>
                    </div>
                </div>
                <NuxtLink class="header-top__logo" :to="localePath('/')">
                    <img class="header__bottom-img" src="~/assets/image/svg/logo.svg" alt="LOGO" width="57" height="24">
                </NuxtLink>
                <div class="header-top-number site-text-hover">+998 (99) <span>123 45 67</span></div>
            </div>
        </div>

        <Transition class="enter__box" name="modal">
            <div class="enter" v-if="openUserModal">
                <div class="enter__wrapper">
                    <div class="enter__top">
                        <div class="enter__container">
                            <h3 class="enter__title">Вход</h3>
                            <img @click="openUserModal = false, overlay = false" class="enter__img"
                                src="~/assets/image/svg/x.svg" alt="" width="26" height="26">
                        </div>
                    </div>
                    <div class="enter__main">
                        <div class="enter__container">
                            <form class="enter__form" @submit.prevent="login">
                                <input id="enterNumber" class="enter__num-input" type="text"
                                    placeholder="Логин (номер телефона)">
                                <input id="enterPassword" class="enter__lock-input" type="password" placeholder="Пароль">
                                <div class="enter__checkbox-wrapper">
                                    <div>
                                        <input class="enter__checkbox" type="checkbox" name="" id="enter__checkbox">
                                        <label class="enter__checkbox-text" for="enter__checkbox">Запомнить меня</label>
                                    </div>
                                    <p class="enter__zabil">Забыли пароль?</p>
                                </div>
                                <button class="site-btn enter__btn">Войти</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </Transition>

        <Transition name="modal">
            <div class="enter cong" v-if="useopen">
                <div class="enter__wrapper cong__wrapper">
                    <div class="enter__top cong__top">
                        <div class="enter__container">
                            <h3 class="enter__title cong__title">Поздравляем, вы успешно зарегистрировались</h3>
                            <img class="enter__img cong__img" src="~/assets/image/svg/x.svg" alt="" width="26" height="26"
                                @click="useopen = false">
                        </div>
                    </div>
                    <div class="enter__main cong__main">
                        <div class="enter__container">
                            <img src="~/assets/image/svg/check.svg" alt="" width="86" height="86">
                            <h3 class="cong__cong-title">Поздравляем</h3>
                            <button class="cong__btn site-btn"
                                @click="useopen = false, overlay = false, refresh()">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
        <div class="overlay" @click="useopen = false" v-if="useopen"></div>

        <div class="header-bottom">
            <div class="container">
                <NuxtLink class="header-bottom__logo" :to="localePath('/')">
                    <img class="header__bottom-img" src="~/assets/image/svg/logo.svg" alt="LOGO" width="136" height="56">
                </NuxtLink>
                <div class="header-bottom__look">
                    <div @click="openMenu = !openMenu, overlay = true" class="header-bottom__catalog site-btn">
                        <img src="~/assets/image/svg/darhboard.svg" alt="darhboars" width="24" height="24">
                        <p class="header-bottom__catalog-text">Каталог</p>
                    </div>
                    <div @click="bars = !bars, overlay = true" class="header-bottom__bars">
                        <img class="header-bottom__bars-img" src="~/assets/image/svg/menu.svg" alt="">
                    </div>
                    <label>
                        <form class="header-bottom__form">
                            <input class="header-bottom-input" @input="search" v-model="searchText" type="search"
                                placeholder="поиск товаров на сайте">
                            <div class="header-bottom__search site-btn">
                                <img class="header-bottom__search-img" src="~/assets/image/svg/search.svg" alt="search"
                                    width="24" height="24">
                                <div class="header-bottom__search-text">Поиск</div>
                            </div>
                            <ul class="small-search" v-if="searchItem">
                                <li class="small-search__item" v-for="item in searchItem?.data?.items" :key="item.id">
                                    <NuxtLink class="small-search__item-link" :to="`/product/${item?.slug}`"
                                        @click="searchText = '', searchItem = null">
                                        <img :src="item.imageUrl" alt="">
                                        <h4>{{ item?.name }}</h4>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </form>
                    </label>
                </div>
                <ul class="header-bottom__list">
                    <li class="header-bottom__item" @click="userModal = !userModal">
                        <svg v-if="!userInfo" class="header-bottom__item-img" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="8" r="4" stroke="#626364" stroke-width="2" stroke-linecap="round" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13.3265 15.0759C12.8885 15.0255 12.4451 15 11.9999 15C10.0804 15 8.19371 15.4738 6.63101 16.3732C5.06889 17.2721 3.88112 18.5702 3.33078 20.1106C3.14497 20.6307 3.41596 21.203 3.93605 21.3888C4.45614 21.5746 5.02838 21.3036 5.21419 20.7835C5.57546 19.7723 6.39641 18.8157 7.6286 18.1066C8.6426 17.523 9.86363 17.1503 11.1579 17.0368C11.4888 16.0601 12.3089 15.3092 13.3265 15.0759Z"
                                fill="#626364" />
                            <path d="M18 14L18 22" stroke="#626364" stroke-width="2.5" stroke-linecap="round" />
                            <path d="M22 18L14 18" stroke="#626364" stroke-width="2.5" stroke-linecap="round" />
                        </svg>
                        <svg v-if="userInfo" class="header-bottom__item-img" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
                                stroke="#626364" stroke-width="2" stroke-linecap="round" />
                            <circle cx="12" cy="8" r="4" stroke="#626364" stroke-width="2" stroke-linecap="round" />
                        </svg>

                        <Transition name="fade">
                            <div class="small-enter" v-if="userModal" :class="{ 'active-modal': !UserModalActive }">
                                <div @click="openUserModal = true, overlay = true" class="small-enter__wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 7.13193V6.61204C7 4.46614 7 3.3932 7.6896 2.79511C8.37919 2.19703 9.44136 2.34877 11.5657 2.65224L15.8485 3.26408C18.3047 3.61495 19.5327 3.79039 20.2664 4.63628C21 5.48217 21 6.72271 21 9.20377V14.7962C21 17.2773 21 18.5178 20.2664 19.3637C19.5327 20.2096 18.3047 20.385 15.8485 20.7359L11.5657 21.3478C9.44136 21.6512 8.37919 21.803 7.6896 21.2049C7 20.6068 7 19.5339 7 17.388V17.066"
                                            stroke="#2FB946" stroke-width="2" />
                                        <path
                                            d="M16 12L16.7809 11.3753L17.2806 12L16.7809 12.6247L16 12ZM4 13C3.44771 13 3 12.5523 3 12C3 11.4477 3.44771 11 4 11V13ZM12.7809 6.3753L16.7809 11.3753L15.2191 12.6247L11.2191 7.6247L12.7809 6.3753ZM16.7809 12.6247L12.7809 17.6247L11.2191 16.3753L15.2191 11.3753L16.7809 12.6247ZM16 13H4V11H16V13Z"
                                            fill="#2FB946" />
                                    </svg>
                                    <p class="small-enter__text">Войти</p>
                                </div>
                                <div class="small-enter__wrapper" @click="registorModal = true, overlay = true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="8" r="4" stroke="#2FB946" stroke-width="2"
                                            stroke-linecap="round" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M13.3265 15.0759C12.8885 15.0255 12.4451 15 11.9999 15C10.0804 15 8.19371 15.4738 6.63101 16.3732C5.06889 17.2721 3.88112 18.5702 3.33078 20.1106C3.14497 20.6307 3.41596 21.203 3.93605 21.3888C4.45614 21.5746 5.02838 21.3036 5.21419 20.7835C5.57546 19.7723 6.39641 18.8157 7.6286 18.1066C8.6426 17.523 9.86363 17.1503 11.1579 17.0368C11.4888 16.0601 12.3089 15.3092 13.3265 15.0759Z"
                                            fill="#2FB946" />
                                        <path d="M18 14L18 22" stroke="#2FB946" stroke-width="2.5" stroke-linecap="round" />
                                        <path d="M22 18L14 18" stroke="#2FB946" stroke-width="2.5" stroke-linecap="round" />
                                    </svg>
                                    <p class="small-enter__text">Зарегистрироваться</p>
                                </div>
                            </div>
                        </Transition>
                        <Transition name="fade">
                            <div class="passUser" v-if="userModal" :class="{ 'active-modal': UserModalActive }">
                                <div class="passUser__container">
                                    <img src="~/assets/image/svg/passUser.svg" alt="passUser" width="28" height="28">
                                    <div class="passUser__wrapper">
                                        <div class="passUser__name">{{ userInfo?.firstname }}</div>
                                        <div class="passUser__num">+{{ userInfo?.username }}</div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </li>
                    <li @click="like = !like, overlay = true" class="header-bottom__item item-index">
                        <span class="item-index-i" v-if="store?.savedProducts?.data?.length">
                            <p>{{ store?.savedProducts?.data?.length }}</p>
                        </span>
                        <svg class="header-bottom__item-img" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
                                stroke="#626364" stroke-width="2" />
                        </svg>
                    </li>
                    <li class="header-bottom__item">
                        <svg class="header-bottom__item-img" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.49697 2.53538C2.40413 2.64275 2.37459 2.71744 2.37459 2.86215C2.37459 3.19359 2.46743 3.25894 3.30301 3.52503C3.70815 3.65574 4.05842 3.78177 4.0753 3.80045C4.13438 3.86113 1.54744 9.9624 1.40396 10.1024C1.20983 10.2938 1.18029 10.4059 1.20983 10.798C1.27735 11.6196 1.4757 12.1984 1.91459 12.8566C2.54339 13.8043 3.45916 14.3318 4.55217 14.3831C5.64096 14.4345 6.47655 14.0704 7.24883 13.2068C7.83965 12.5486 8.1435 11.8577 8.24478 10.938C8.28699 10.5599 8.28277 10.4759 8.2279 10.3265C8.18992 10.2285 8.11396 10.1258 8.05488 10.0978C7.9747 10.0558 7.72571 9.50025 6.7593 7.21286C6.10518 5.65837 5.55234 4.34662 5.53124 4.30461C5.50592 4.24392 5.51014 4.22992 5.54812 4.24392C5.57766 4.25326 6.57361 4.57069 7.75525 4.94414C8.94111 5.31759 9.93706 5.63503 9.97504 5.64903C10.0257 5.66304 10.0594 5.7704 10.0932 6.03182C10.2029 6.85808 10.7009 7.53963 11.3803 7.79638L11.5745 7.87107L11.566 12.6839L11.5534 17.5015L10.7304 17.5248C10.0088 17.5481 9.87797 17.5621 9.67541 17.6555C9.01707 17.9496 8.57818 18.6545 8.57818 19.4247V19.7095L8.38405 19.7842C7.9325 19.9522 7.51892 20.3537 7.33324 20.8065C7.15177 21.2453 7.08003 22.1696 7.20241 22.4964C7.3248 22.8185 7.03361 22.7998 11.9965 22.7998C16.9594 22.7998 16.6682 22.8185 16.7905 22.4964C16.8623 22.3096 16.8665 21.7821 16.8032 21.3527C16.6977 20.6104 16.2504 20.0269 15.6089 19.7842L15.4148 19.7095V19.4247C15.4148 18.6545 14.9759 17.9496 14.3175 17.6555C14.115 17.5621 13.9842 17.5481 13.2625 17.5248L12.4396 17.5015L12.4269 12.6839L12.4185 7.87107L12.5746 7.81505C12.946 7.68434 13.4609 7.24087 13.6297 6.90943C13.6719 6.83007 13.8069 6.86742 16.0731 7.58164C17.394 8.00178 18.5166 8.35656 18.5672 8.3799C18.6516 8.41724 18.601 8.55729 17.3518 11.5122C16.377 13.823 16.0183 14.6352 15.9254 14.7239C15.7313 14.9106 15.7018 15.0507 15.7524 15.5548C15.8495 16.5258 16.301 17.4968 16.9171 18.0616C17.4109 18.5098 17.6388 18.6545 18.2001 18.8599C18.5335 18.9813 18.6094 18.9906 19.234 18.9906C19.9599 18.9953 20.1371 18.9579 20.6688 18.7012C21.5171 18.2904 22.2641 17.4174 22.5806 16.4558C22.7029 16.087 22.8 15.5408 22.8 15.2467C22.8 15.004 22.6861 14.7472 22.5595 14.7052C22.5046 14.6866 22.1121 13.8043 21.2512 11.769C20.5802 10.1725 20.0316 8.86072 20.0358 8.85605C20.04 8.84671 20.2722 8.91673 20.5549 9.00543C20.8334 9.09412 21.1331 9.16881 21.2175 9.16881C21.5762 9.16881 21.7576 8.65999 21.5044 8.3799C21.3863 8.25386 20.9685 8.11848 14.1614 5.96646L13.942 5.89644L13.9166 5.63036C13.8322 4.78543 13.3638 4.09454 12.6759 3.79111C12.486 3.70708 12.3552 3.68841 11.9965 3.68841C11.4985 3.68841 11.2369 3.77244 10.8908 4.04786C10.7136 4.18323 10.4435 4.50533 10.3548 4.67339C10.3253 4.73408 9.75137 4.56602 6.62848 3.57171C4.59859 2.9275 2.86834 2.4 2.77972 2.4C2.66155 2.4 2.58981 2.43268 2.49697 2.53538ZM12.4438 4.73874C13.233 5.15888 13.2288 6.40994 12.4396 6.81607C11.7095 7.19419 10.8613 6.53131 10.9541 5.65837C11.0005 5.25691 11.258 4.86945 11.5913 4.70607C11.7981 4.60803 12.2328 4.62204 12.4438 4.73874ZM5.85619 7.35757L6.96609 9.98574L4.7463 9.99974C3.52668 10.0044 2.52229 9.99974 2.50963 9.98574C2.49697 9.97174 2.99072 8.77669 3.60264 7.32956C4.21456 5.87777 4.72098 4.7014 4.73364 4.71073C4.74208 4.72007 5.24849 5.91512 5.85619 7.35757ZM20.3861 11.993L21.4875 14.6072L19.2678 14.6212C18.0481 14.6259 17.0395 14.6212 17.0311 14.6119C17.0227 14.6025 17.5122 13.4075 18.1241 11.9557C18.736 10.5039 19.2467 9.3322 19.2593 9.3462C19.2762 9.36488 19.7826 10.5553 20.3861 11.993ZM7.35434 11.0034C7.35434 11.0687 7.20663 11.5402 7.13067 11.7223C6.70866 12.7306 5.73803 13.4122 4.7252 13.4168C3.77567 13.4168 2.83036 12.796 2.39991 11.881C2.26486 11.5916 2.1256 11.1621 2.12138 11.0221C2.12138 11.0034 3.29879 10.9894 4.73786 10.9894C6.17692 10.9894 7.35434 10.9941 7.35434 11.0034ZM21.8505 15.7602C21.8336 15.8443 21.7661 16.059 21.6986 16.2411C21.2892 17.3287 20.3144 18.0383 19.2382 18.0383C18.0692 18.0336 17.0395 17.1794 16.7061 15.9423C16.6682 15.8022 16.6386 15.6715 16.6386 15.6482C16.6386 15.6295 17.816 15.6109 19.2593 15.6109H21.88L21.8505 15.7602ZM14.0601 18.5985C14.1614 18.6638 14.3049 18.7945 14.3766 18.8926C14.4821 19.0373 14.5075 19.1213 14.5201 19.3687L14.537 19.6721H11.9965H9.45596L9.47284 19.3687C9.4855 19.1213 9.51082 19.0373 9.62055 18.8926C9.76825 18.6872 9.9666 18.5471 10.1776 18.5004C10.262 18.4818 11.1271 18.4678 12.102 18.4724L13.8744 18.4818L14.0601 18.5985ZM15.246 20.7038C15.3515 20.7271 15.5076 20.8065 15.592 20.8719C15.7819 21.0119 15.9634 21.3947 15.9634 21.6421V21.8195H11.9923H8.0169L8.04222 21.5861C8.08864 21.1379 8.35451 20.8018 8.72588 20.7038C8.96221 20.6431 15.0012 20.6431 15.246 20.7038Z"
                                fill="#626364" stroke="#626364" stroke-width="0.6" />
                        </svg>

                    </li>
                    <li @click="cart = !cart, overlay = true" class="header-bottom__item item-index">
                        <span v-if="modalCart.length" class="item-index-i">
                            <p>{{ modalCart.length }}</p>
                        </span>
                        <svg class="header-bottom__item-img" width="24" height="25" viewBox="0 0 24 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 12.5918L8 8.5918C8 6.38266 9.79086 4.5918 12 4.5918V4.5918C14.2091 4.5918 16 6.38266 16 8.5918L16 12.5918"
                                stroke="#626364" stroke-width="2" stroke-linecap="round" />
                            <path
                                d="M3.69435 13.2596C3.83942 11.5187 3.91196 10.6483 4.48605 10.12C5.06013 9.5918 5.9336 9.5918 7.68053 9.5918H16.3195C18.0664 9.5918 18.9399 9.5918 19.514 10.12C20.088 10.6483 20.1606 11.5187 20.3057 13.2596L20.8195 19.4257C20.904 20.4392 20.9462 20.946 20.6491 21.2689C20.352 21.5918 19.8435 21.5918 18.8264 21.5918H5.1736C4.15655 21.5918 3.64802 21.5918 3.35092 21.2689C3.05382 20.946 3.09605 20.4392 3.18051 19.4257L3.69435 13.2596Z"
                                stroke="#626364" stroke-width="2" />
                        </svg>
                    </li>
                </ul>
            </div>
        </div>

        <div class="hero__bottom">
            <ul class="header-bottom__list">
                <li @click="openMenu = !openMenu, overlay = true" class="header-bottom__item">
                    <svg class="header-bottom__item-img" width="35" height="35" viewBox="0 0 35 35" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24.7916" cy="11.6667" r="5.83333" fill="#2FB946" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M18.5412 16.5H7.29166C6.73938 16.5 6.29166 16.9477 6.29166 17.5C6.29166 18.0523 6.73938 18.5 7.29166 18.5H20.7183C19.8719 17.9765 19.1327 17.2963 18.5412 16.5ZM17.4506 9.20834C17.2255 9.84147 17.0795 10.5121 17.0245 11.2083H7.29166C6.73938 11.2083 6.29166 10.7606 6.29166 10.2083C6.29166 9.65606 6.73938 9.20834 7.29166 9.20834H17.4506ZM6.29166 24.7917C6.29166 24.2394 6.73938 23.7917 7.29166 23.7917H27.7083C28.2606 23.7917 28.7083 24.2394 28.7083 24.7917C28.7083 25.344 28.2606 25.7917 27.7083 25.7917H7.29166C6.73938 25.7917 6.29166 25.344 6.29166 24.7917Z"
                            fill="#333333" />
                    </svg>

                </li>
                <li @click="userModalTwo = !userModalTwo" class="header-bottom__item">
                    <svg class="header-bottom__item-img" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="4" stroke="#626364" stroke-width="2" stroke-linecap="round" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M13.3265 15.0759C12.8885 15.0255 12.4451 15 11.9999 15C10.0804 15 8.19371 15.4738 6.63101 16.3732C5.06889 17.2721 3.88112 18.5702 3.33078 20.1106C3.14497 20.6307 3.41596 21.203 3.93605 21.3888C4.45614 21.5746 5.02838 21.3036 5.21419 20.7835C5.57546 19.7723 6.39641 18.8157 7.6286 18.1066C8.6426 17.523 9.86363 17.1503 11.1579 17.0368C11.4888 16.0601 12.3089 15.3092 13.3265 15.0759Z"
                            fill="#626364" />
                        <path d="M18 14L18 22" stroke="#626364" stroke-width="2.5" stroke-linecap="round" />
                        <path d="M22 18L14 18" stroke="#626364" stroke-width="2.5" stroke-linecap="round" />
                    </svg>
                    <!-- SMALL -->
                    <Transition name="bot">
                        <div class="small-enter" v-if="userModalTwo">
                            <div @click="openUserModal = true, overlay = true" class="small-enter__wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 7.13193V6.61204C7 4.46614 7 3.3932 7.6896 2.79511C8.37919 2.19703 9.44136 2.34877 11.5657 2.65224L15.8485 3.26408C18.3047 3.61495 19.5327 3.79039 20.2664 4.63628C21 5.48217 21 6.72271 21 9.20377V14.7962C21 17.2773 21 18.5178 20.2664 19.3637C19.5327 20.2096 18.3047 20.385 15.8485 20.7359L11.5657 21.3478C9.44136 21.6512 8.37919 21.803 7.6896 21.2049C7 20.6068 7 19.5339 7 17.388V17.066"
                                        stroke="#2FB946" stroke-width="2" />
                                    <path
                                        d="M16 12L16.7809 11.3753L17.2806 12L16.7809 12.6247L16 12ZM4 13C3.44771 13 3 12.5523 3 12C3 11.4477 3.44771 11 4 11V13ZM12.7809 6.3753L16.7809 11.3753L15.2191 12.6247L11.2191 7.6247L12.7809 6.3753ZM16.7809 12.6247L12.7809 17.6247L11.2191 16.3753L15.2191 11.3753L16.7809 12.6247ZM16 13H4V11H16V13Z"
                                        fill="#2FB946" />
                                </svg>
                                <p class="small-enter__text">Войти</p>
                            </div>
                            <div @click="registorModal = true, overlay = true" class="small-enter__wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="8" r="4" stroke="#2FB946" stroke-width="2" stroke-linecap="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M13.3265 15.0759C12.8885 15.0255 12.4451 15 11.9999 15C10.0804 15 8.19371 15.4738 6.63101 16.3732C5.06889 17.2721 3.88112 18.5702 3.33078 20.1106C3.14497 20.6307 3.41596 21.203 3.93605 21.3888C4.45614 21.5746 5.02838 21.3036 5.21419 20.7835C5.57546 19.7723 6.39641 18.8157 7.6286 18.1066C8.6426 17.523 9.86363 17.1503 11.1579 17.0368C11.4888 16.0601 12.3089 15.3092 13.3265 15.0759Z"
                                        fill="#2FB946" />
                                    <path d="M18 14L18 22" stroke="#2FB946" stroke-width="2.5" stroke-linecap="round" />
                                    <path d="M22 18L14 18" stroke="#2FB946" stroke-width="2.5" stroke-linecap="round" />
                                </svg>
                                <p class="small-enter__text">Зарегистрироваться</p>
                            </div>
                        </div>
                    </Transition>
                </li>
                <li @click="like = !like, overlay = true" class="header-bottom__item">
                    <svg class="header-bottom__item-img" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
                            stroke="#626364" stroke-width="2" />
                    </svg>
                </li>
                <li class="header-bottom__item">
                    <svg class="header-bottom__item-img" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.49697 2.53538C2.40413 2.64275 2.37459 2.71744 2.37459 2.86215C2.37459 3.19359 2.46743 3.25894 3.30301 3.52503C3.70815 3.65574 4.05842 3.78177 4.0753 3.80045C4.13438 3.86113 1.54744 9.9624 1.40396 10.1024C1.20983 10.2938 1.18029 10.4059 1.20983 10.798C1.27735 11.6196 1.4757 12.1984 1.91459 12.8566C2.54339 13.8043 3.45916 14.3318 4.55217 14.3831C5.64096 14.4345 6.47655 14.0704 7.24883 13.2068C7.83965 12.5486 8.1435 11.8577 8.24478 10.938C8.28699 10.5599 8.28277 10.4759 8.2279 10.3265C8.18992 10.2285 8.11396 10.1258 8.05488 10.0978C7.9747 10.0558 7.72571 9.50025 6.7593 7.21286C6.10518 5.65837 5.55234 4.34662 5.53124 4.30461C5.50592 4.24392 5.51014 4.22992 5.54812 4.24392C5.57766 4.25326 6.57361 4.57069 7.75525 4.94414C8.94111 5.31759 9.93706 5.63503 9.97504 5.64903C10.0257 5.66304 10.0594 5.7704 10.0932 6.03182C10.2029 6.85808 10.7009 7.53963 11.3803 7.79638L11.5745 7.87107L11.566 12.6839L11.5534 17.5015L10.7304 17.5248C10.0088 17.5481 9.87797 17.5621 9.67541 17.6555C9.01707 17.9496 8.57818 18.6545 8.57818 19.4247V19.7095L8.38405 19.7842C7.9325 19.9522 7.51892 20.3537 7.33324 20.8065C7.15177 21.2453 7.08003 22.1696 7.20241 22.4964C7.3248 22.8185 7.03361 22.7998 11.9965 22.7998C16.9594 22.7998 16.6682 22.8185 16.7905 22.4964C16.8623 22.3096 16.8665 21.7821 16.8032 21.3527C16.6977 20.6104 16.2504 20.0269 15.6089 19.7842L15.4148 19.7095V19.4247C15.4148 18.6545 14.9759 17.9496 14.3175 17.6555C14.115 17.5621 13.9842 17.5481 13.2625 17.5248L12.4396 17.5015L12.4269 12.6839L12.4185 7.87107L12.5746 7.81505C12.946 7.68434 13.4609 7.24087 13.6297 6.90943C13.6719 6.83007 13.8069 6.86742 16.0731 7.58164C17.394 8.00178 18.5166 8.35656 18.5672 8.3799C18.6516 8.41724 18.601 8.55729 17.3518 11.5122C16.377 13.823 16.0183 14.6352 15.9254 14.7239C15.7313 14.9106 15.7018 15.0507 15.7524 15.5548C15.8495 16.5258 16.301 17.4968 16.9171 18.0616C17.4109 18.5098 17.6388 18.6545 18.2001 18.8599C18.5335 18.9813 18.6094 18.9906 19.234 18.9906C19.9599 18.9953 20.1371 18.9579 20.6688 18.7012C21.5171 18.2904 22.2641 17.4174 22.5806 16.4558C22.7029 16.087 22.8 15.5408 22.8 15.2467C22.8 15.004 22.6861 14.7472 22.5595 14.7052C22.5046 14.6866 22.1121 13.8043 21.2512 11.769C20.5802 10.1725 20.0316 8.86072 20.0358 8.85605C20.04 8.84671 20.2722 8.91673 20.5549 9.00543C20.8334 9.09412 21.1331 9.16881 21.2175 9.16881C21.5762 9.16881 21.7576 8.65999 21.5044 8.3799C21.3863 8.25386 20.9685 8.11848 14.1614 5.96646L13.942 5.89644L13.9166 5.63036C13.8322 4.78543 13.3638 4.09454 12.6759 3.79111C12.486 3.70708 12.3552 3.68841 11.9965 3.68841C11.4985 3.68841 11.2369 3.77244 10.8908 4.04786C10.7136 4.18323 10.4435 4.50533 10.3548 4.67339C10.3253 4.73408 9.75137 4.56602 6.62848 3.57171C4.59859 2.9275 2.86834 2.4 2.77972 2.4C2.66155 2.4 2.58981 2.43268 2.49697 2.53538ZM12.4438 4.73874C13.233 5.15888 13.2288 6.40994 12.4396 6.81607C11.7095 7.19419 10.8613 6.53131 10.9541 5.65837C11.0005 5.25691 11.258 4.86945 11.5913 4.70607C11.7981 4.60803 12.2328 4.62204 12.4438 4.73874ZM5.85619 7.35757L6.96609 9.98574L4.7463 9.99974C3.52668 10.0044 2.52229 9.99974 2.50963 9.98574C2.49697 9.97174 2.99072 8.77669 3.60264 7.32956C4.21456 5.87777 4.72098 4.7014 4.73364 4.71073C4.74208 4.72007 5.24849 5.91512 5.85619 7.35757ZM20.3861 11.993L21.4875 14.6072L19.2678 14.6212C18.0481 14.6259 17.0395 14.6212 17.0311 14.6119C17.0227 14.6025 17.5122 13.4075 18.1241 11.9557C18.736 10.5039 19.2467 9.3322 19.2593 9.3462C19.2762 9.36488 19.7826 10.5553 20.3861 11.993ZM7.35434 11.0034C7.35434 11.0687 7.20663 11.5402 7.13067 11.7223C6.70866 12.7306 5.73803 13.4122 4.7252 13.4168C3.77567 13.4168 2.83036 12.796 2.39991 11.881C2.26486 11.5916 2.1256 11.1621 2.12138 11.0221C2.12138 11.0034 3.29879 10.9894 4.73786 10.9894C6.17692 10.9894 7.35434 10.9941 7.35434 11.0034ZM21.8505 15.7602C21.8336 15.8443 21.7661 16.059 21.6986 16.2411C21.2892 17.3287 20.3144 18.0383 19.2382 18.0383C18.0692 18.0336 17.0395 17.1794 16.7061 15.9423C16.6682 15.8022 16.6386 15.6715 16.6386 15.6482C16.6386 15.6295 17.816 15.6109 19.2593 15.6109H21.88L21.8505 15.7602ZM14.0601 18.5985C14.1614 18.6638 14.3049 18.7945 14.3766 18.8926C14.4821 19.0373 14.5075 19.1213 14.5201 19.3687L14.537 19.6721H11.9965H9.45596L9.47284 19.3687C9.4855 19.1213 9.51082 19.0373 9.62055 18.8926C9.76825 18.6872 9.9666 18.5471 10.1776 18.5004C10.262 18.4818 11.1271 18.4678 12.102 18.4724L13.8744 18.4818L14.0601 18.5985ZM15.246 20.7038C15.3515 20.7271 15.5076 20.8065 15.592 20.8719C15.7819 21.0119 15.9634 21.3947 15.9634 21.6421V21.8195H11.9923H8.0169L8.04222 21.5861C8.08864 21.1379 8.35451 20.8018 8.72588 20.7038C8.96221 20.6431 15.0012 20.6431 15.246 20.7038Z"
                            fill="#626364" stroke="#626364" stroke-width="0.6" />
                    </svg>
                </li>
                <li class="header-bottom__item">
                    <svg class="header-bottom__item-img" width="24" height="25" viewBox="0 0 24 25" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 12.5918L8 8.5918C8 6.38266 9.79086 4.5918 12 4.5918V4.5918C14.2091 4.5918 16 6.38266 16 8.5918L16 12.5918"
                            stroke="#626364" stroke-width="2" stroke-linecap="round" />
                        <path
                            d="M3.69435 13.2596C3.83942 11.5187 3.91196 10.6483 4.48605 10.12C5.06013 9.5918 5.9336 9.5918 7.68053 9.5918H16.3195C18.0664 9.5918 18.9399 9.5918 19.514 10.12C20.088 10.6483 20.1606 11.5187 20.3057 13.2596L20.8195 19.4257C20.904 20.4392 20.9462 20.946 20.6491 21.2689C20.352 21.5918 19.8435 21.5918 18.8264 21.5918H5.1736C4.15655 21.5918 3.64802 21.5918 3.35092 21.2689C3.05382 20.946 3.09605 20.4392 3.18051 19.4257L3.69435 13.2596Z"
                            stroke="#626364" stroke-width="2" />
                    </svg>
                </li>
            </ul>
        </div>

        <Transition class="enter__box register__box" name="modal">
            <div class="enter register" v-if="registorModal">
                <div class="enter__wrapper">
                    <div class="enter__top">
                        <div class="enter__container">
                            <h3 class="enter__title">Регистрация</h3>
                            <img @click="registorModal = false, overlay = false" class="enter__img"
                                src="~/assets/image/svg/x.svg" alt="" width="26" height="26">
                        </div>
                    </div>
                    <div class="enter__main">
                        <div class="enter__container">
                            <form class="enter__form" @submit.prevent="register()">
                                <p class="register__text">Введите свой номер телефона для регистрации</p>
                                <input class="enter__num-input" id="registorInput" type="text" placeholder="Введите номер"
                                    required>
                                <button class="site-btn enter__btn">Отправить</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </Transition>

        <Transition class="enter__box kod__box" name="modal">
            <div class="enter kod" v-if="registorModalCode">
                <div class="enter__wrapper">
                    <div class="enter__top">
                        <div class="enter__container">
                            <h3 class="enter__title">Подтверждение</h3>
                            <img @click="registorModalCode = false, overlay = false" class="enter__img"
                                src="~/assets/image/svg/x.svg" alt="" width="26" height="26">
                        </div>
                    </div>
                    <div class="enter__main">
                        <div class="enter__container">
                            <form class="enter__form" @submit.prevent="register2()">
                                <p class="register__text">Введите код, отправленный на ваш номер телефона</p>
                                <input id="registorCode" class="enter__num-input" type="password" placeholder="Введите код">
                                <button class="site-btn enter__btn">Отправить</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </Transition>

        <Transition class="enter__box yurface__box" name="modal">
            <div class="enter yurface" v-if="yurface">
                <div class="enter__wrapper">
                    <div class="enter__top">
                        <div class="enter__container">
                            <h3 class="enter__title">Юр лицо</h3>
                            <img @click="yurface = false, overlay = false" class="enter__img" src="~/assets/image/svg/x.svg"
                                alt="" width="26" height="26">
                        </div>
                    </div>
                    <div class="enter__main">
                        <div class="enter__container">
                            <form class="enter__form" @submit.prevent="register3">
                                <input id="registorName" class="enter__num-input" type="text" placeholder="Имя">
                                <input id="registorLastName" class="enter__num-input" type="text" placeholder="Фамилия">
                                <input id="registorPassword" class="enter__num-input" type="password" placeholder="Пароль">
                                <input id="registorReapetPass" class="enter__num-input" type="password"
                                    placeholder="Заново введите пароль">
                                <button class="site-btn enter__btn">Регистрация</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </Transition>

        <Transition name="bars">
            <div class="bars" v-if="bars">
                <div class="bars__wrapper">
                    <div class="bars__top">
                        <NuxtLink class="bars-top__logo" :to="localePath('/')">
                            <img class="header__bottom-img" src="~/assets/image/svg/logo.svg" alt="LOGO" width="57"
                                height="24">
                        </NuxtLink>
                        <div class="languages language__bars">
                            <div class="default-language" @click="openLang = !openLang">
                                <img class="language-img" src="~/assets/image/svg/rus.svg" alt="RUS" width="14" height="14">
                                <p class="language-text">{{ lang }}</p>
                                <img class="language-arrow" src="~/assets/image/svg/arrow.svg" alt="ARROW" width="8"
                                    height="5">
                            </div>
                            <Transition name="fade">
                                <div class="language-wrapper" v-if="openLang">
                                    <span class="language-text" @click="updateLang">Eng</span>
                                    <span class="language-text" @click="updateLang">Uzb</span>
                                    <span class="language-text" @click="updateLang">Рус</span>
                                </div>
                            </Transition>
                        </div>
                        <button class="bars__top-x-btn" @click="bars = !bars, overlay = false">
                            <img src="~/assets/image/svg/x.svg" alt="x" width="24" height="24">
                        </button>
                    </div>
                    <div class="bars__center">
                        <div @click="openUserModal = true, bars = !bars, overlay = true" class="bars__center-enter">
                            <img src="~/assets/image/png/enter.png" alt="user enter" width="35" height="35">
                            <p class="bars__center-text">Вход</p>
                        </div>
                        <p @click="registorModal = true, bars = !bars, overlay = true" class="bars__center-text">
                            Регистрация</p>
                    </div>
                    <div class="bars__footer">
                        <div @click="openMenu = !openMenu, bars = !bars" class="bars__footer-item">
                            <img src="~/assets/image/svg/Substrar.svg" alt="Substrar" width="35" height="35">
                            <p class="bars__footer-text">Каталог товаров</p>
                        </div>
                        <div class="bars__footer-item">
                            <img src="~/assets/image/svg/Shop.svg" alt="Substrar" width="35" height="35">
                            <p class="bars__footer-text">О магазине</p>
                        </div>
                        <div class="bars__footer-item">
                            <img src="~/assets/image/svg/Paper_light.svg" alt="Substrar" width="24" height="24">
                            <p class="bars__footer-text">Условия доставки</p>
                        </div>
                    </div>
                </div>
                <div class="bars__back">
                    <img src="~/assets/image/svg/bars-back.svg" alt="back" width="24" height="24">
                    <p class="bars__footer-text">выйти и аккаунта </p>
                </div>
            </div>
        </Transition>





        <!-- LIKE -->
        <Transition name="like">
            <div v-if="like" class="likee">
                <div class="likee__header">
                    <div class="container">
                        <p>Желания</p>
                        <img @click="like = !like, overlay = false" src="~/assets/image/svg/x.svg" alt="x" width="26"
                            height="26">
                    </div>
                </div>
                <div class="likee__hero">
                    <div class="container" v-if="store?.savedProducts?.data?.length">
                        <div v-for="p in store.savedProducts?.data" :key="p" class="likee__item">
                            <div class="likee__content-wrapper">
                                <div class="img-wrapper">
                                    <img class="img" :src="p.imageUrl" alt="" width="55" height="55">
                                </div>
                                <div class="text-wrapper">
                                    <p class="title">{{ p.name }}</p>
                                    <p class="price">{{ p.price }} cум</p>
                                </div>
                            </div>
                            <div class="btn-wrapper">
                                <button class="site-btn">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 12.5918L8 8.5918C8 6.38266 9.79086 4.5918 12 4.5918V4.5918C14.2091 4.5918 16 6.38266 16 8.5918L16 12.5918"
                                            stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
                                        <path
                                            d="M3.69435 13.2596C3.83942 11.5187 3.91196 10.6483 4.48605 10.12C5.06013 9.5918 5.9336 9.5918 7.68053 9.5918H16.3195C18.0664 9.5918 18.9399 9.5918 19.514 10.12C20.088 10.6483 20.1606 11.5187 20.3057 13.2596L20.8195 19.4257C20.904 20.4392 20.9462 20.946 20.6491 21.2689C20.352 21.5918 19.8435 21.5918 18.8264 21.5918H5.1736C4.15655 21.5918 3.64802 21.5918 3.35092 21.2689C3.05382 20.946 3.09605 20.4392 3.18051 19.4257L3.69435 13.2596Z"
                                            stroke="#FFFFFF" stroke-width="2" />
                                    </svg>
                                    <span>Корзину</span>
                                </button>
                                <img @click="store.addToLiked(p)" class="x" src="~/assets/image/svg/x.svg" alt="x"
                                    width="26" height="26">
                            </div>
                        </div>
                    </div>
                    <div class="container" v-if="!store?.savedProducts?.data?.length">
                        <h1 class="likee__empty-title site-title">Ваш список избранного пуст</h1>
                    </div>
                </div>
            </div>
        </Transition>
        <!-- LIKE -->
        <Transition name="like">
            <div v-if="cart" class="cart">
                <div class="cart__header">
                    <div class="container">
                        <p>Корзина покупателя</p>
                        <img @click="cart = !cart, overlay = false" src="~/assets/image/svg/x.svg" alt="x" width="26"
                            height="26">
                    </div>
                </div>
                <div class="cart__hero">
                    <div class="container">
                        <div v-for="p in modalCart" :key="p" class="cart__item">
                            <div class="cart__content-wrapper">
                                <div class="img-wrapper">
                                    <img class="img" :src="p.imageUrl" alt="" width="55" height="55">
                                </div>
                                <div class="text-wrapper">
                                    <p class="title">{{ p.name }}</p>
                                    <p class="price">{{ p.price }} cум</p>
                                </div>
                            </div>
                            <div class="btn-wrapper">
                                <div class="border-wrapper">
                                    <div class="dec">-</div>
                                    <div class="num">2</div>
                                    <div class="inc">+</div>
                                </div>
                                <img @click="deleteFromCart(p)" class="x" src="~/assets/image/svg/x.svg" alt="x" width="26"
                                    height="26">
                            </div>
                        </div>
                    </div>
                    <div v-if="!modalCart.length" class="container">
                        <h1 class="cart__empty-title site-title">В корзине нет товаров</h1>
                    </div>
                    <button @click="buyCart">click me</button>
                </div>
            </div>
        </Transition>
    </header>

    <NuxtPage />

    <footer>
        <div class="footer-top">
            <div class="container">
                <ul class="footer-top__list">
                    <!-- ITEM 1 -->
                    <div>
                        <li class="footer-top__item">
                            <h3 class="footer-top__title">Покупателям</h3>
                            <p class="footer-top__text">Как сделать заказ</p>
                            <p class="footer-top__text">Способы оплаты</p>
                            <p class="footer-top__text">Доставка</p>
                            <p class="footer-top__text">Возврат товара</p>
                            <p class="footer-top__text">Возврат денежных средств</p>
                            <p class="footer-top__text">Правила продажи</p>
                            <p class="footer-top__text">Вопросы и ответы</p>
                        </li>
                        <!-- ITEM 2 -->
                        <li class="footer-top__item">
                            <h3 class="footer-top__title">Партнерам</h3>
                            <p class="footer-top__text">Продавайте на ТОП-ИТ </p>
                            <p class="footer-top__text">Перевозчикам</p>
                            <p class="footer-top__text">Откройте пункт выдачи</p>
                        </li>
                    </div>
                    <!-- ITEM 3 -->
                    <div>
                        <li class="footer-top__item">
                            <h3 class="footer-top__title">Компания</h3>
                            <p class="footer-top__text">О нас</p>
                            <p class="footer-top__text">Реквизиты</p>
                            <p class="footer-top__text">Пресс-центр</p>
                            <p class="footer-top__text">Контакты</p>
                            <p class="footer-top__text">Вакансии</p>
                        </li>
                        <!-- ITEM 4 -->
                        <li class="footer-top__item">
                            <h3 class="footer-top__title">Наши проекты</h3>
                            <p class="footer-top__text">ЗОЖ и спорт</p>
                            <p class="footer-top__text">Детям</p>
                            <p class="footer-top__text">Трудоустройство</p>
                        </li>
                    </div>
                </ul>
                <ul class="footer-top__list-app">
                    <!-- ITEM 1 -->
                    <li class="footer-top__item-app">
                        <h3 class="footer-top__title">Мобильные устройства</h3>
                        <img class="footer-top__item-app-img" src="~/assets/image/png/foot1.png" alt="foot" width="160"
                            height="42">
                        <img class="footer-top__item-app-img" src="~/assets/image/png/foot2.png" alt="foot" width="160"
                            height="42">
                    </li>
                    <!-- ITEM 2 -->
                    <li class="footer-top__item-app">
                        <h3 class="footer-top__title">Мы в соцсетях</h3>
                        <ul class="footer-top__list-social">
                            <li class="footer-top__item-social">
                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1662_3968)">
                                        <path
                                            d="M8.46876 14.7041L8.11174 19.8236C8.62255 19.8236 8.84377 19.5999 9.10907 19.3313L11.5039 16.998L16.4663 20.7028C17.3763 21.2199 18.0176 20.9476 18.2631 19.8493L21.5203 4.28904L21.5212 4.28812C21.8099 2.91656 21.0347 2.38022 20.148 2.7167L1.00186 10.1897C-0.304825 10.7068 -0.285041 11.4494 0.779733 11.7859L5.67463 13.338L17.0445 6.08508C17.5796 5.72386 18.0661 5.92372 17.6659 6.28495L8.46876 14.7041Z"
                                            fill="#8F8E94" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1662_3968">
                                            <rect width="21.5832" height="22.0036" fill="white"
                                                transform="translate(0 0.785645)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </li>
                            <li class="footer-top__item-social">
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1662_3972)">
                                        <path
                                            d="M15.6956 0.785645H7.60188C3.87742 0.785645 0.857117 3.80595 0.857117 7.53041V15.6241C0.857117 19.3486 3.87742 22.3689 7.60188 22.3689H15.6956C19.4201 22.3689 22.4404 19.3486 22.4404 15.6241V7.53041C22.4404 3.80595 19.4201 0.785645 15.6956 0.785645ZM20.4169 15.6241C20.4169 18.2276 18.2991 20.3455 15.6956 20.3455H7.60188C4.9984 20.3455 2.88055 18.2276 2.88055 15.6241V7.53041C2.88055 4.92693 4.9984 2.80907 7.60188 2.80907H15.6956C18.2991 2.80907 20.4169 4.92693 20.4169 7.53041V15.6241Z"
                                            fill="#8F8E94" />
                                        <path
                                            d="M11.6486 6.18164C8.66872 6.18164 6.25275 8.59762 6.25275 11.5775C6.25275 14.5573 8.66872 16.9733 11.6486 16.9733C14.6284 16.9733 17.0444 14.5573 17.0444 11.5775C17.0444 8.59762 14.6284 6.18164 11.6486 6.18164ZM11.6486 14.9498C9.7897 14.9498 8.27618 13.4363 8.27618 11.5775C8.27618 9.71725 9.7897 8.20507 11.6486 8.20507C13.5074 8.20507 15.0209 9.71725 15.0209 11.5775C15.0209 13.4363 13.5074 14.9498 11.6486 14.9498Z"
                                            fill="#8F8E94" />
                                        <path
                                            d="M17.4492 6.4956C17.8462 6.4956 18.1681 6.17369 18.1681 5.77661C18.1681 5.37952 17.8462 5.05762 17.4492 5.05762C17.0521 5.05762 16.7302 5.37952 16.7302 5.77661C16.7302 6.17369 17.0521 6.4956 17.4492 6.4956Z"
                                            fill="#8F8E94" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1662_3972">
                                            <rect width="21.5832" height="21.5832" fill="white"
                                                transform="translate(0.857117 0.785645)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </li>
                            <li class="footer-top__item-social">
                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1662_3986)">
                                        <path
                                            d="M16.1868 0.790223L13.388 0.785645C10.2436 0.785645 8.21153 2.91108 8.21153 6.20077V8.6975H5.39743C5.15425 8.6975 4.95734 8.89848 4.95734 9.14639V12.7639C4.95734 13.0118 5.15448 13.2125 5.39743 13.2125H8.21153V22.3406C8.21153 22.5885 8.40845 22.7893 8.65162 22.7893H12.3232C12.5664 22.7893 12.7633 22.5883 12.7633 22.3406V13.2125H16.0537C16.2968 13.2125 16.4937 13.0118 16.4937 12.7639L16.4951 9.14639C16.4951 9.02736 16.4486 8.91336 16.3662 8.82912C16.2838 8.74488 16.1715 8.6975 16.0548 8.6975H12.7633V6.58099C12.7633 5.56371 13.0011 5.04728 14.3009 5.04728L16.1864 5.0466C16.4293 5.0466 16.6262 4.84561 16.6262 4.59793V1.23889C16.6262 0.991436 16.4295 0.790681 16.1868 0.790223Z"
                                            fill="#8F8E94" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1662_3986">
                                            <rect width="21.5832" height="22.0036" fill="white"
                                                transform="translate(0 0.785645)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </li>
                            <li class="footer-top__item-social">
                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1662_3983)">
                                        <path
                                            d="M20.4056 6.47878C20.1741 5.61814 19.4956 4.93971 18.6351 4.70797C17.063 4.27783 10.7747 4.27783 10.7747 4.27783C10.7747 4.27783 4.4866 4.27783 2.91455 4.69166C2.07059 4.92316 1.37549 5.61826 1.14399 6.47878C0.730286 8.0507 0.730286 11.3107 0.730286 11.3107C0.730286 11.3107 0.730286 14.5871 1.14399 16.1426C1.37573 17.0031 2.05404 17.6815 2.91468 17.9133C4.50316 18.3435 10.7749 18.3435 10.7749 18.3435C10.7749 18.3435 17.063 18.3435 18.6351 17.9297C19.4957 17.6981 20.1741 17.0196 20.4059 16.1591C20.8194 14.5871 20.8194 11.3272 20.8194 11.3272C20.8194 11.3272 20.836 8.0507 20.4056 6.47878ZM8.77262 14.3224V8.299L14.0017 11.3107L8.77262 14.3224Z"
                                            fill="#8F8E94" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1662_3983">
                                            <rect width="21.4286" height="21.4286" fill="white"
                                                transform="translate(0.0714111 0.785645)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container">
                <p class="footer-bottom-text">2021-2022 ©ТОП-ИТ. Все права защищены. Указанная стоимость товаров и условия
                    их приобретения действительны по состоянию на текущую дату. Сайт разработан <span>iTeach</span> </p>
                <ul class="footer-bottom__list">
                    <li class="footer-bottom__item">
                        <img class="footer-bottom__item-img" src="~/assets/image/png/click.png" alt="cart" width="47"
                            height="28">
                    </li>
                    <li class="footer-bottom__item">
                        <img class="footer-bottom__item-img" src="~/assets/image/png/humo.png" alt="cart" width="47"
                            height="28">
                    </li>
                    <li class="footer-bottom__item">
                        <img class="footer-bottom__item-img" src="~/assets/image/png/visa.png" alt="cart" width="47"
                            height="28">
                    </li>
                    <li class="footer-bottom__item">
                        <img class="footer-bottom__item-img" src="~/assets/image/png/uzcard.png" alt="cart" width="47"
                            height="28">
                    </li>
                    <li class="footer-bottom__item">
                        <img class="footer-bottom__item-img" src="~/assets/image/png/payme.png" alt="cart" width="47"
                            height="28">
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from "vue"
import { useStore } from "~~/stores/store";
import { modalCart, deleteFromCart, updateCart } from "~~/options/savedCart";
import { getToLiked, savedProducts, addToLiked } from '~/options/savedLiked'
const store = useStore()
store.getToLiked()
updateCart()
// async function buyCart() {
//     const data = await $fetch(baseUrl + '/order-manager/order/by', {
//         method: "POST",
//         body: JSON.stringify({

//         })
//     })
// }
useHead({
    title: "TOP-IT",
    meta: [{ name: "description", content: "TOP-IT" }],
});
function refresh() {
    window.location.reload()
}
console.log(JSON.stringify(localStorage.getItem('profileInfo')));
const { locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const baseUrl = useRuntimeConfig().public.baseUrl;
const openLang = ref(false)
const openUserModal = ref(false)
const userModal = ref(false)
const userModalTwo = ref(false)
const useopen = ref(false)
const openMenu = ref(false)
const overlay = ref(false)
let registorModal = ref(false)
let registorModalCode = ref(false)
let yurface = ref(false)
let bars = ref(false)
let like = ref(false)
let cart = ref(false)

let lang = ref('Рус')
const searchItem = ref([])
const searchText = ref('')
function search(e) {
    $fetch(baseUrl + '/product-manager/product/search', {
        method: 'POST',
        params: {
            category: 'all',
            key: searchText.value
        }
    }).then(data => {
        if (searchText.value) {
            searchItem.value = data
        } else {
            searchItem.value = null
        }
    })
}
const UserModalActive = computed(() => {
    if (localStorage.getItem('profileInfo')) {
        return true
    }
})

const userInfo = ref(null)
function getUserInfo() {
    if (localStorage.getItem('profileInfo')) {
        userInfo.value = JSON.parse(localStorage.getItem('profileInfo'))
    }
}
getUserInfo()

const phone = {
    phone: '998911310104',
}
const code = {
    phone: '998911310104',
    code: 7777
}
const user = {
    phone: '998911310104',
    code: 7777,
    firstname: 'Ozodbek',
    lastname: 'Tursunaliyev',
    password: 'qwertyuiop',
    password_repeat: 'qwertyuiop'
}
const userLogin = {
    username: '998911310104',
    password: 'qwertyuiop'
}
async function register() {
    const int = document.getElementById('registorInput')
    await $fetch(baseUrl + '/auth/register/phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            phone: int.value
        },
    }).then(data => {
        console.log(data);
        if (data.status === 403) {
            console.log('nomerni kiriting');
        }
        if (data.data === null) {
            localStorage.setItem('phoneNumber', int.value)
            registorModalCode.value = !registorModalCode.value, registorModal.value = false
        }
    })
}

async function register2() {
    const int = document.getElementById('registorCode')
    await $fetch(baseUrl + '/auth/register/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            phone: localStorage.getItem('phoneNumber'),
            code: int.value
        },
    }).then(data => {
        console.log(data);
        if (data.status === 403) {
            console.log(data.message);
        }
        if (data.data === null) {
            yurface.value = !yurface.value, registorModalCode.value = false
            localStorage.setItem('code', int.value)
        }
    })

}

async function register3() {
    const name = document.getElementById('registorName')
    const lastname = document.getElementById('registorLastName')
    const password = document.getElementById('registorPassword')
    const reapetPass = document.getElementById('registorReapetPass')
    await $fetch(baseUrl + '/auth/register/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            phone: localStorage.getItem('phoneNumber'),
            code: localStorage.getItem('code'),
            firstname: name.value,
            lastname: lastname.value,
            password: password.value,
            password_repeat: reapetPass.value,
        },
    }).then(data => {
        console.log(data);
        if (data.data) {
            localStorage.setItem('profileInfo', JSON.stringify(data.data))
            useopen.value = !useopen.value, yurface.value = false, overlay.value = false
        }
    })
}

function login() {
    let phoneNumber = document.getElementById('enterNumber')
    let password = document.getElementById('enterPassword')
    $fetch(baseUrl + '/auth/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            username: phoneNumber.value,
            password: password.value
        }
    }).then(data => {
        if (data.status === 403) {
            console.log(data.status);
        }
        if (data.data) {
            useopen.value = !useopen.value, openUserModal.value = false, overlay.value = false
            localStorage.setItem('profileInfo', JSON.stringify(data.data))
            console.log(data);
        }
    })
}





const headerMenu = ref([])
watchEffect(async () => {
    await $fetch(baseUrl + '/site/header-menus', {
        method: 'POST',
        headers: {
            'Accept-Language': locale.value,
        }
    }).then(data => {
        headerMenu.value = data
    })
})






function updateLang(e) {
    lang.value = e.target.textContent;
    openLang.value = false
}
function removeOverlay() {
    overlay.value = false
    userModal.value = false
    openMenu.value = false
    openUserModal.value = false
    yurface.value = false
    registorModalCode.value = false
    registorModal.value = false
    bars.value = false
    like.value = false
    cart.value = false
}
const config = useRuntimeConfig().public;
const { data: menu } = useFetch(config.baseUrl + '/product-manager/category/index');
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
    transform: translateY(0);
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(20%);
    opacity: 0;
}

.bot-enter-active,
.bot-leave-active {
    transition: all 0.5s ease;
    transform: translateY(0);
}

.bot-enter-from,
.bot-leave-to {
    opacity: 0;
    transform: translateY(-50%);
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.modal-enter-from,
.modal-leave-to {
    transition: all 0.3s;
    position: fixed;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
}

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

.bars-enter-active,
.bars-leave-active {
    transition: all 0.5s ease;
    transform: translateX(0);
}

.bars-enter-from,
.bars-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.like-enter-active,
.like-leave-active {
    transition: all 0.5s ease;
    transform: translateY(0);
}

.like-enter-from,
.like-leave-to {
    opacity: 0;
    transform: translateY(-8%);
}</style>