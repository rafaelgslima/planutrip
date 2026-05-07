import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../pages/api/detect-language';

global.fetch = vi.fn();

describe('/api/detect-language', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns pt for Brazilian IP', async () => {
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      setHeader: vi.fn(),
    } as unknown as NextApiResponse;

    const mockReq = {
      method: 'GET',
      headers: { 'x-forwarded-for': '1.2.3.4' },
      socket: { remoteAddress: '1.2.3.4' },
    } as unknown as NextApiRequest;

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ country_code: 'BR' }),
    });

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ language: 'pt', detected: true });
  });

  it('returns pt for Portuguese IP', async () => {
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      setHeader: vi.fn(),
    } as unknown as NextApiResponse;

    const mockReq = {
      method: 'GET',
      headers: { 'x-forwarded-for': '1.2.3.4' },
      socket: { remoteAddress: '1.2.3.4' },
    } as unknown as NextApiRequest;

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ country_code: 'PT' }),
    });

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ language: 'pt', detected: true });
  });

  it('returns en for other countries', async () => {
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      setHeader: vi.fn(),
    } as unknown as NextApiResponse;

    const mockReq = {
      method: 'GET',
      headers: { 'x-forwarded-for': '1.2.3.4' },
      socket: { remoteAddress: '1.2.3.4' },
    } as unknown as NextApiRequest;

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ country_code: 'US' }),
    });

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ language: 'en', detected: false });
  });

  it('returns en on fetch failure', async () => {
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      setHeader: vi.fn(),
    } as unknown as NextApiResponse;

    const mockReq = {
      method: 'GET',
      headers: { 'x-forwarded-for': '1.2.3.4' },
      socket: { remoteAddress: '1.2.3.4' },
    } as unknown as NextApiRequest;

    (global.fetch as any).mockRejectedValue(new Error('Network error'));

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ language: 'en', detected: false });
  });

  it('returns en for localhost', async () => {
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      setHeader: vi.fn(),
    } as unknown as NextApiResponse;

    const mockReq = {
      method: 'GET',
      headers: {},
      socket: { remoteAddress: '127.0.0.1' },
    } as unknown as NextApiRequest;

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ language: 'en', detected: false });
  });

  it('returns 405 for non-GET requests', async () => {
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      setHeader: vi.fn(),
    } as unknown as NextApiResponse;

    const mockReq = {
      method: 'POST',
      headers: {},
      socket: { remoteAddress: '1.2.3.4' },
    } as unknown as NextApiRequest;

    await handler(mockReq, mockRes);

    expect(mockRes.setHeader).toHaveBeenCalledWith('Allow', 'GET');
    expect(mockRes.status).toHaveBeenCalledWith(405);
  });
});
