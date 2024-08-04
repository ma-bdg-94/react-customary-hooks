import { renderHook, act } from '@testing-library/react';
import useClipboard from './useClipboard';

describe('useClipboard', () => {
  // original navigator.clipboard
  const originalClipboard = navigator.clipboard;

  beforeAll(() => {
    // Mock the clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
        readText: jest.fn(),
      },
    });
  });

  afterAll(() => {
    // Restore the original clipboard object
    Object.assign(navigator, {
      clipboard: originalClipboard,
    });
  });

  it('should copy text to clipboard and update state', async () => {
    const { result } = renderHook(() => useClipboard());
    
    // Mock the writeText method
    const textToCopy = 'test text';
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValue(undefined);
    
    await act(async () => {
      await result.current.copyToClipboard(textToCopy);
    });

    expect(result.current.getClipboardContent()).toBe(textToCopy);
    expect(result.current.full).toBe(true);
  });

  it('should paste text from clipboard and update state', async () => {
    const { result } = renderHook(() => useClipboard());
    
    // Mock the readText method
    const pastedText = 'pasted text';
    (navigator.clipboard.readText as jest.Mock).mockResolvedValue(pastedText);
    
    const text = await act(async () => {
      return await result.current.pasteFromClipboard();
    });

    expect(text).toBe(pastedText);
    expect(result.current.getClipboardContent()).toBe(pastedText);
    expect(result.current.full).toBe(true);
  });

  it('should cut text to clipboard and clear internal state', async () => {
    const { result } = renderHook(() => useClipboard());

    const textToCut = 'cut text';
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValue(undefined);

    await act(async () => {
      await result.current.cutToClipboard(textToCut);
    });

    expect(result.current.getClipboardContent()).toBe('');
    expect(result.current.full).toBe(false);
  });

  it('should handle clipboard API failures gracefully', async () => {
    const { result } = renderHook(() => useClipboard());
    
    // Mock the writeText method to fail
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(new Error('Copy failed'));

    await act(async () => {
      await result.current.copyToClipboard('text');
    });

    expect(result.current.getClipboardContent()).toBe('');
    expect(result.current.full).toBe(false);
  });
});
