import type { Snackbar } from "@/type/common/Snackbar";

export const useSnackbar = () => {
  const snackbar = useState<Snackbar>("snackbar", () => {
    return {
      isShow: false,
      message: "",
      color: "",
    };
  });

  const showSnackbar = (
    message: string,
    action: "success" | "primary" | "info" | "warning" | "error"
  ) => {
    switch (action) {
      case "success":
        snackbar.value.color = "green-accent-1";
        break;
      case "primary":
        snackbar.value.color = "blue-accent-1";
        break;
      case "info":
        snackbar.value.color = "cyan-accent-1";
        break;
      case "warning":
        snackbar.value.color = "amber-accent-1";
        break;
      case "error":
        snackbar.value.color = "red-accent-1";
        break;
      default:
        snackbar.value.color = "green-accent-1";
    }

    snackbar.value.message = message;
    snackbar.value.isShow = true;
  };

  return {
    snackbar,
    showSnackbar,
  };
};
