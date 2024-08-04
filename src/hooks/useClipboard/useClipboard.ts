import { useState, useCallback } from 'react';

const useClipboard = () => {
  const [clipboardContent, setClipboardContent] = useState<string>('');
  const [full, setFull] = useState<boolean>(false);

  const updateStatus = (content: string) => {
    if (content) {
      setFull(true);
    } else {
      setFull(false);
    }
  };

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setClipboardContent(text);
      updateStatus(text);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  }, []);

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboardContent(text);
      updateStatus(text);
      return text;
    } catch (err) {
      console.error('Failed to paste from clipboard', err);
      return '';
    }
  }, []);

  const cutToClipboard = useCallback(async (text: string) => {
    try {
      await copyToClipboard(text);
      setClipboardContent('');
      updateStatus('');
    } catch (err) {
      console.error('Failed to cut to clipboard', err);
    }
  }, [copyToClipboard]);

  const getClipboardContent = useCallback(() => clipboardContent, [clipboardContent]);

  return {
    copyToClipboard,
    pasteFromClipboard,
    cutToClipboard,
    getClipboardContent,
    full,
  };
};

export default useClipboard;
