import { useState } from "react";

export const useVirtualizedDropdown = () => {
  const [single, setSingle] = useState<{ id: number; name: string } | null>(
    null,
  );
  const [multi, setMulti] = useState<{ id: number; name: string }[]>([]);
  const [large, setLarge] = useState<{ id: number; name: string } | null>(null);

  return {
    single,
    setSingle,
    multi,
    setMulti,
    large,
    setLarge,
  };
};
