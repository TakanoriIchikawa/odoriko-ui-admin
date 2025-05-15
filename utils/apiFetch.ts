import { $fetch, FetchError } from "ofetch";
import type { FetchOptions } from "ofetch";
import { useSnackbar } from "@/composables/common/useSnackbar";

interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
}
type ResponseType = keyof ResponseMap | "json";
type apiFetchOptions<R extends ResponseType> = FetchOptions<R> & {};

export const apiFetch = async <T, R extends ResponseType = "json">(
  path: RequestInfo,
  { method, body, ...options }: apiFetchOptions<R> = {}
) => {
  const { frontendUrl, backendUrl } = useRuntimeConfig().public
  if (process.client && ["POST", "PUT", "DELETE"].includes(String(method).toUpperCase())) {
    // XSRF-TOKEN が重複するため事前に削除
    const oldToken = useCookie("XSRF-TOKEN");
    oldToken.value = null;

    await $fetch("/sanctum/csrf-cookie", {
      baseURL: backendUrl,
      credentials: "include",
    });
  }

  const token = useCookie("XSRF-TOKEN");
  const headers: any = {
    accept: "application/json",
    "X-XSRF-TOKEN": token.value,
    ...options?.headers,
    ...(method === "PUT" || method === "DELETE" ? { "X-HTTP-Method-Override": method } : {}),
    ...(process.server ? { ...useRequestHeaders(["cookie"]), referer: frontendUrl } : {}),
  };

  try {
    return await $fetch<T, R>(path, {
      method: method === "PUT" || method === "DELETE" ? "POST" : method,
      baseURL: backendUrl,
      credentials: "include",
      headers,
      body,
      ...options,
    });
  } catch (error) {
    if ((error instanceof FetchError) && error.response?.status === 401) {

      if (path === "auth/worker") {
        return;
      }

      if (path === "auth/login" || path === "auth/register") {
        throw error;
      }

      const router = useRouter();
      const route = useRoute();
      await router.push({ name: "signin", query: { returnPath: route.path } });
      const { showSnackbar } = useSnackbar();
      showSnackbar("認証の有効期限が切れています。お手数ですが、再度ログインをしてください。", "error");

    } else {
      throw error;
    }
  }
};
