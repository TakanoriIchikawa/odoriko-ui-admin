<script setup lang="ts">

definePageMeta({ middleware: ['auth'] })

import { ref } from "vue";
import type { ErrorResponse } from "@/type/api/ErrorResponse";
const { auth, logout, update, destroy } = useAuth()
const { user, users, fetch, all, find } = useUser()
const { paginate } = usePaginate()
const { showSnackbar } = useSnackbar();

const router = useRouter();
const email = ref<string>(auth.value?.email ?? '');
const file = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const emailError = ref<string>('');
const isLoading = ref<boolean>(false)
const isDialog = ref<boolean>(false)

await useAsyncData('findUserData', async () => {
  await find('01jbrhw8cm4wza576tsbhpxgyz');
  return { user: user.value }
});

await useAsyncData('fetchUserData', async () => {
  await fetch({});
  return { users: users.value }
});

const signout = async () => {
  isLoading.value = true;
  await logout().then(() => {
    showSnackbar('ログアウトに成功しました', "success");
    router.push("/signin");
  })
  .catch((errorResponse: ErrorResponse) => {
    showSnackbar(errorResponse.data.message, "error");
  })
  .finally(() => {
    isLoading.value = false;
  });
}

const onSelectedFile = () => {
  if (file.value) {
    previewUrl.value = URL.createObjectURL(file.value);
  }
};

const onUpdate = async () => {
  if (auth.value) {
    isLoading.value = true;
    const formData = new FormData();
    formData.append('email', email.value);
    if (file.value) {
      formData.append('file', file.value);
    }

    await update(formData).then(() => {
      showSnackbar('会員情報を更新しました', "success");
    }).catch((error: ErrorResponse) => {
      showSnackbar(error.data.message, "error");
    }).finally(() => {
      isLoading.value = false;
    });
  }
};

const onDestroy = async () => {
  if (auth.value) {
    isLoading.value = true;
    await destroy().then(() => {
      showSnackbar('退会処理が完了しました', "success");
      router.push("/");
    }).catch((error: ErrorResponse) => {
      showSnackbar(error.data.message, "error");
    }).finally(() => {
      isLoading.value = false;
    });
  }
}

const emailRules = (v: any): boolean | string => {
  if (!v) {
    return "メールアドレスを入力してください";
  }
  // if (v.test(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
  //   return 'メールアドレスの形式を確認してください'
  // }
  return true;
};

</script>

<template>
  <div>
    <p>認証アカウント</p>
    <div>
      {{ auth }}
    </div>

    <p>ユーザー</p>
    <div>{{ user?.email }}</div>
    <div>{{ user?.createdAt }}</div>

    <p>ユーザー一覧</p>
    <div v-for="(userA, index) in users" :key="index">
      <p>{{ userA.email }}</p>
    </div>

    <p>ページネーション</p>
    <div>{{ paginate }}</div>
    
    <v-img
      v-if="auth && auth.image"
      :src="auth.image"
      max-width="200"
      max-height="200"
      class="mt-4"
    ></v-img>

    <v-form>

      <v-text-field
        v-model="email"
        label="メールアドレス"
        type="email"
        placeholder="example@versionx.jp"
        hide-details="auto"
        class="mb-2"
        :error="!!emailError"
        :error-messages="emailError"
        :rules="[(v) => emailRules(v)]"
      ></v-text-field>

      <!-- ファイル入力 -->
      <v-file-input
        v-model="file"
        label="画像を選択"
        accept="image/*"
        @change="onSelectedFile"
        prepend-icon="mdi-camera"
      ></v-file-input>

      <!-- 画像プレビュー -->
      <v-img
        v-if="previewUrl"
        :src="previewUrl"
        max-width="200"
        max-height="200"
        class=""
      ></v-img>

      <!-- 更新ボタン -->
      <v-btn @click="onUpdate" block color="primary" :loading="isLoading">
        更新
      </v-btn>
    </v-form>

    <div class="m-5"></div>

    <v-btn block color="primary" @click="signout" :loading="isLoading">
      ログアウト
    </v-btn>

    <div class="m-5"></div>

    <v-dialog v-model="isDialog" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          block
          text="退会"
        ></v-btn>
      </template>

      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="退会"
            @click="onDestroy"
          ></v-btn>

          <v-btn
            text="キャンセル"
            @click="isDialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>