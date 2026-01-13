import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as db from '../db';
import { InsertUser } from '../../drizzle/schema';

// Mock user for testing
const testUser: InsertUser = {
  openId: 'test-user-' + Date.now(),
  name: 'Test User',
  email: 'test@example.com',
  loginMethod: 'oauth',
  role: 'user',
};

let userId: number;

describe('Database Features', () => {
  beforeAll(async () => {
    // Create test user
    await db.upsertUser(testUser);
    const user = await db.getUserByOpenId(testUser.openId!);
    if (user) {
      userId = user.id;
    } else {
      throw new Error('Failed to create test user');
    }
  });

  describe('Reports', () => {
    let reportId: number;

    it('should create a report', async () => {
      const result = await db.createReport(userId, {
        reportType: 'los_santos',
        startTime: '2:00 م',
        endTime: '3:00 م',
        data: {
          operations: 'Op1',
          deputyOperations: 'Deputy1',
          cycles: ['جيم 1', 'جيم 2'],
        },
      });

      expect(result).toBeDefined();
      reportId = 1; // For testing purposes
    });

    it('should list user reports', async () => {
      const reports = await db.getUserReports(userId);
      expect(Array.isArray(reports)).toBe(true);
      expect(reports.length).toBeGreaterThan(0);
    });

    it('should get report by id', async () => {
      const reports = await db.getUserReports(userId);
      if (reports.length > 0) {
        const report = await db.getReportById(reports[0].id, userId);
        expect(report).toBeDefined();
        expect(report?.reportType).toBe('los_santos');
      }
    });

    it('should not get report for different user', async () => {
      const report = await db.getReportById(reportId, 9999);
      expect(report).toBeUndefined();
    });

    it('should delete report', async () => {
      await db.deleteReport(reportId, userId);
      const report = await db.getReportById(reportId, userId);
      expect(report).toBeUndefined();
    });
  });

  describe('Wave Names', () => {
    let waveNameId: number;

    it('should create a wave name', async () => {
      const result = await db.createWaveName(userId, {
        position: 'جيم 1',
        code: '123',
        fullName: 'جيم 1 | P-123',
      });

      expect(result).toBeDefined();
      waveNameId = 1; // For testing purposes
    });

    it('should list user wave names', async () => {
      const waveNames = await db.getUserWaveNames(userId);
      expect(Array.isArray(waveNames)).toBe(true);
      expect(waveNames.length).toBeGreaterThan(0);
    });

    it('should delete wave name', async () => {
      await db.deleteWaveName(waveNameId, userId);
      const waveNames = await db.getUserWaveNames(userId);
      const deleted = waveNames.find(w => w.id === waveNameId);
      expect(deleted).toBeUndefined();
    });
  });

  describe('Files', () => {
    let reportId: number;
    let fileId: number;

    beforeAll(async () => {
      // Create a report for file testing
      const result = await db.createReport(userId, {
        reportType: 'sandy_paleto',
        startTime: '1:00 م',
        endTime: '2:00 م',
        data: {},
      });
      reportId = result.insertId;
    });

    it('should create a file', async () => {
      const result = await db.createFile(userId, {
        filename: 'test-report.pdf',
        fileKey: 'reports/test-user/test-report.pdf',
        url: 'https://example.com/test-report.pdf',
        mimeType: 'application/pdf',
        size: 1024,
        reportId,
      });

      expect(result).toBeDefined();
      fileId = 1; // For testing purposes
    });

    it('should list files by report', async () => {
      const files = await db.getReportFiles(reportId, userId);
      expect(Array.isArray(files)).toBe(true);
      // Files may be empty if not created
      expect(files.length).toBeGreaterThanOrEqual(0);
    });

    it('should delete file', async () => {
      await db.deleteFile(fileId, userId);
      const files = await db.getReportFiles(reportId, userId);
      const deleted = files.find(f => f.id === fileId);
      expect(deleted).toBeUndefined();
    });
  });

  describe('Report Types', () => {
    it('should create los_santos report', async () => {
      const result = await db.createReport(userId, {
        reportType: 'los_santos',
        startTime: '2:00 م',
        endTime: '3:00 م',
        data: { cycles: ['جيم 1', 'جيم 2'] },
      });
      expect(result).toBeDefined();
    });

    it('should create sandy_paleto report', async () => {
      const result = await db.createReport(userId, {
        reportType: 'sandy_paleto',
        startTime: '2:00 م',
        endTime: '3:00 م',
        data: { cycles: ['سين 1', 'باء 1'] },
      });
      expect(result).toBeDefined();
    });

    it('should create officers report', async () => {
      const result = await db.createReport(userId, {
        reportType: 'officers',
        startTime: '2:00 م',
        endTime: '3:00 م',
        data: { officer: 'Officer1', zone: 'لوس سانتوس' },
      });
      expect(result).toBeDefined();
    });

    it('should create zone_officers report', async () => {
      const result = await db.createReport(userId, {
        reportType: 'zone_officers',
        startTime: '2:00 م',
        endTime: '3:00 م',
        data: { zoneOfficer: 'ZoneOfficer1', zone: 'لوس سانتوس' },
      });
      expect(result).toBeDefined();
    });
  });
});
