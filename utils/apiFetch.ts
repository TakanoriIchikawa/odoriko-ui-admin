import { $fetch, FetchError } from "ofetch";
import type { FetchOptions } from "ofetch";
import { useSnackbar } from "@/composables/common/useSnackbar";

interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
}
type ResponseType = keyof ResponseMap | "json";
type apiFetchOptions<R extends ResponseType> = FetchOptions<R> & {
  isRedirectSignIn?: boolean;
};

export const apiFetch = async <T, R extends ResponseType = "json">(
  path: RequestInfo,
  { isRedirectSignIn = true, ...options }: apiFetchOptions<R> = {}
) => {
  // TODO: 調整
  // const { frontendUrl, backendUrl } = useRuntimeConfig().public

  console.log("通信開始（URL固定で指定）");
  console.log(path);
  const frontendUrl = "http://hutokyaku.localhost";
  const backendUrl = "http://user.api.hutokyaku.localhost";

  if (
    process.client &&
    ["post", "put", "delete"].includes(
      String(options?.method?.toLowerCase() ?? "")
    )
  ) {
    // XSRF-TOKEN が重複するため事前に削除
    const oldToken = useCookie("XSRF-TOKEN");
    oldToken.value = null;

    await $fetch("/api/sanctum/csrf-cookie", {
      baseURL: backendUrl,
      credentials: "include",
    });
  }

  const token = useCookie("XSRF-TOKEN");

  let serverHeaders: any = {};
  if (process.server) {
    serverHeaders = {
      ...useRequestHeaders(["cookie"]),
      referer: frontendUrl,
    };
  }

  const headers: any = {
    accept: "application/json",
    "content-type": "application/json",
    "X-XSRF-TOKEN": token.value,
    ...options?.headers,
    ...serverHeaders,
  };

  try {
    return await $fetch<T, R>(path, {
      ...options,
      baseURL: backendUrl,
      credentials: "include",
      headers,
    });
  } catch (error) {
    if ((error instanceof FetchError) && error.response?.status === 401) {

      if (path === "auth/user" || path === "auth/logout") {
        return;
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
