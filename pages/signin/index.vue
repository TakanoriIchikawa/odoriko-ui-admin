<script setup lang="ts">

definePageMeta({ middleware: ['guest'] })

import { ref } from "vue";
import { VForm } from "vuetify/components";
import type { ErrorResponse } from "@/type/api/ErrorResponse";
const { login } = useAuth();
const { showSnackbar } = useSnackbar();

const route = useRoute()
const router = useRouter();
const formElement = ref<VForm>();
const email = ref<string>('');
const password = ref<string>('');
const emailError = ref<string>('');
const passwordError = ref<string>('');
const isLoading = ref<boolean>(false);

const signin = async () => {
  const isValid = (await formElement.value?.validate())?.valid;
  if (isValid) {
    isLoading.value = true;
    const params = {
      email: email.value, 
      password: password.value,
    };
    await login(params).then(() => {
        const path = route.query.returnPath ? String(route.query.returnPath) : '/'
        router.push(path);
        showSnackbar("ログインに成功しました", "success");
      })
      .catch((errorResponse: ErrorResponse) => {
        showSnackbar(errorResponse.data.message, "error");
        if (errorResponse.status === 422) {
          const errors = errorResponse.data.errors
          emailError.value = errors.email?.[0] ?? '';
          passwordError.value = errors.password?.[0] ?? '';
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
};

const emailRules = (v: any): boolean | string => {
  if (!v) {
    return "メールアドレスを入力してください";
  }
  // if (v.test(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
  //   return 'メールアドレスの形式を確認してください'
  // }
  return true;
};

const passwordRules = (v: any): boolean | string => {
  if (!v) {
    return "パスワードを入力してください";
  }
  return true;
};

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-bold mb-8 text-center">ログイン</h1>
      <v-form ref="formElement">
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

        <v-text-field
          v-model="password"
          label="パスワード"
          type="password"
          placeholder=""
          hide-details="auto"
          class="mb-2"
          :error="!!passwordError"
          :error-messages="passwordError"
          :rules="[(v) => passwordRules(v)]"
        ></v-text-field>

        <v-btn block color="primary" @click="signin" :loading="isLoading">
          ログイン
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
