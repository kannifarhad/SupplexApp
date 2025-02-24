import { useState, useCallback } from "react";
import ActionPopover from "./ActionPopover";

interface UseActionPopoverOptions {
  onConfirm: (id: string) => Promise<void> | void;
  loading: boolean;
}

export const useActionPopover = ({ onConfirm, loading }: UseActionPopoverOptions) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const openPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
    setShowSuccess(false);
  }, []);

  const closePopover = useCallback(() => {
    setAnchorEl(null);
    setSelectedId(null);
    setShowSuccess(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!selectedId) return;
    await onConfirm(selectedId);
    setShowSuccess(true);
    // setTimeout(() => {
    //   closePopover();
    // }, 1500);
  }, [onConfirm, selectedId, closePopover]);

  // Return the Popover component pre-configured
  const ActionPopoverComponent = (
    <ActionPopover
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      loading={loading}
      showSuccess={showSuccess}
      onConfirm={handleConfirm}
      onClose={closePopover}
    />
  );

  return {
    openPopover,
    ActionPopoverComponent, // Pre-configured Popover Component
  };
};