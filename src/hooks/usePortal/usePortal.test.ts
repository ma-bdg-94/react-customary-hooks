import "@testing-library/jest-dom";
import { renderHook } from '@testing-library/react';
import usePortal from './usePortal';

describe('usePortal', () => {
  it('should create a portal element with the given id', () => {
    const id = 'my-portal';
    const { result } = renderHook(() => usePortal(id));

    expect(result.current).toBeInTheDocument();
    expect(result.current?.id).toBe(id);
  });

  it('should cleanup the portal element on unmount', () => {
    const id = 'my-portal';
    const { unmount } = renderHook(() => usePortal(id));
  
    unmount();
  
    const element = document.getElementById(id);
    expect(element).toBeNull();
  });

  it('should reuse the existing portal element with the same id', () => {
    const id = 'my-portal';
    const { result: result1 } = renderHook(() => usePortal(id));
    const { result: result2 } = renderHook(() => usePortal(id));

    expect(result1.current).toBe(result2.current);
  });
});
