<script setup lang="ts">

const { auth } = useAuth()

</script>

<template>
  <div>
    <div>
      <NuxtLink to="/">トップページ</NuxtLink>
    </div>

    <div v-if="auth">
      <NuxtLink to="/test">テスト（認証必要）</NuxtLink>
    </div>
    <div v-else>
      <NuxtLink to="/signup">会員登録</NuxtLink>
      <NuxtLink to="/test">テスト（認証必要）</NuxtLink>
    </div>

    <main class="container">
      <slot />
    </main>
    <CommonSnackbar />
  </div>
</template>
