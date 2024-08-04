import { useEffect, useState } from "react";

const usePortal = (id: string) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(id);
    var created = false;
  
    if (!element) {
      element = document.createElement("div");
      element.id = id;
      document.body.appendChild(element);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
       created = true;
    }
  
    setPortalRoot(element);
  
    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [id]);

  return portalRoot;
};

export default usePortal;