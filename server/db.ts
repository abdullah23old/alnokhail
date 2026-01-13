import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, reports, InsertReport, files, InsertFile, waveNames, InsertWaveName } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Reports queries
export async function createReport(userId: number, report: Omit<InsertReport, 'userId'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(reports).values({
    ...report,
    userId,
  });
  
  return result;
}

export async function getUserReports(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(reports).where(eq(reports.userId, userId));
}

export async function getReportById(reportId: number, userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(reports).where(
    and(eq(reports.id, reportId), eq(reports.userId, userId))
  ).limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function deleteReport(reportId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.delete(reports).where(
    and(eq(reports.id, reportId), eq(reports.userId, userId))
  );
}

// Files queries
export async function createFile(userId: number, file: Omit<InsertFile, 'userId'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(files).values({
    ...file,
    userId,
  });
}

export async function getReportFiles(reportId: number, userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(files).where(
    and(eq(files.reportId, reportId), eq(files.userId, userId))
  );
}

export async function deleteFile(fileId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.delete(files).where(
    and(eq(files.id, fileId), eq(files.userId, userId))
  );
}

// Wave Names queries
export async function createWaveName(userId: number, waveName: Omit<InsertWaveName, 'userId'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(waveNames).values({
    ...waveName,
    userId,
  });
}

export async function getUserWaveNames(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(waveNames).where(eq(waveNames.userId, userId));
}

export async function deleteWaveName(waveNameId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.delete(waveNames).where(
    and(eq(waveNames.id, waveNameId), eq(waveNames.userId, userId))
  );
}
