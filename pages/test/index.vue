<script setup lang="ts">

definePageMeta({ middleware: ['auth'] })

import { ref } from "vue";
import type { ErrorResponse } from "@/type/api/ErrorResponse";
const { auth, logout } = useAuth()
const { user, users, fetch, all, find } = useUser()
const { paginate } = usePaginate()
const { showSnackbar } = useSnackbar();

const router = useRouter();
const isLoading = ref<boolean>(false)

await useAsyncData('findUserData', async () => {
  await find('01jbrhw8cm4wza576tsbhpxgyz');
  return { user: user.value }
});

await useAsyncData('fetchUserData', async () => {
  await fetch({});
  return { users: users.value }
});

// await useAsyncData('allUserData', async () => {
//   await all({});
//   return { users: users.value }
// });

const signout = async () => {
  isLoading.value = true;
  await logout().then(() => {
    router.push("/signin");
    showSnackbar('ログアウトに成功しました', "success");
  })
  .catch((errorResponse: ErrorResponse) => {
    showSnackbar(errorResponse.data.message, "error");
  })
  .finally(() => {
    isLoading.value = false;
  });
}

</script>

<template>
  <div>
    <p>認証アカウント</p>
    <div>
      {{ auth }}
    </div>

    <p>ユーザー</p>
    <div>{{ user?.email }}</div>

    <p>ユーザー一覧</p>
    <div v-for="(userA, index) in users" :key="index">
      <p>{{ userA.email }}</p>
    </div>

    <p>ページネーション</p>
    <div>{{ paginate }}</div>

    <p>------</p>
    <v-btn block color="primary" @click="signout" :loading="isLoading">
      ログアウト
    </v-btn>
  </div>
  
</template>

