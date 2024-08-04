import { useCallback } from "react";

type Options = {
  id?: boolean;
};

const useClassNames = () => {
  const combineFn = useCallback((...classNames: any) => {
    return classNames.filter(Boolean).join(" ");
  }, []);

  return {
    class: (className: string, options: Options) =>
      options?.id ? { id: className } : { className },
    combine: combineFn,
  };
};

export default useClassNames;
