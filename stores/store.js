import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const hello = ref("salom");
  const baseUrl = useRuntimeConfig().public.baseUrl;
  const savedProducts = ref([]);
  async function addToLiked(product) {
    const baseUrl = useRuntimeConfig().public.baseUrl;
    console.log(JSON.parse(localStorage.getItem("profileInfo"))["auth_key"]);
    const req = await $fetch(
      baseUrl + "/product-manager/product-save/create?key=" + product.slug,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("profileInfo"))["auth_key"]
          }`,
        },
      }
    );
    getToLiked();
  }
  async function getToLiked() {
    const baseUrl = useRuntimeConfig().public.baseUrl;
    await $fetch(baseUrl + "/product-manager/product-save/index", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("profileInfo"))["auth_key"]
        }`,
      },
    }).then(data => {
      savedProducts.value = data;
    })
  }
  return {
    savedProducts,
    addToLiked,
    getToLiked,
  };
});
