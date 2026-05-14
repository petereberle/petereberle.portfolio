import { useCallback } from "react";

const useWrapperScrollTo = (defaultOffset = 0) => {
  return useCallback((target = 0, offset = defaultOffset, behavior = "smooth") => {
    if (typeof window === "undefined") return;

    const pageWrapper = document.getElementById("___gatsby");
    if (!pageWrapper || target == null) return;

    const top =
      typeof target === "number"
        ? target - offset
        : target.getBoundingClientRect().top -
          pageWrapper.getBoundingClientRect().top +
          pageWrapper.scrollTop -
          offset;

    pageWrapper.scrollTo({
      top,
      behavior,
    });
  }, [defaultOffset]);
};

export default useWrapperScrollTo;