import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, gameSessions, studentResults, questionResponses, InsertGameSession, InsertStudentResult, InsertQuestionResponse, studentAccounts, InsertStudentAccount, teacherAccounts, InsertTeacherAccount, questions, InsertQuestion } from "../drizzle/schema";
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

// Student account functions
export async function getStudentByNumberAndName(studentNumber: string, studentName: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(studentAccounts).where(
    eq(studentAccounts.studentNumber, studentNumber)
  ).limit(1);
  
  if (result.length > 0 && result[0].studentName === studentName) {
    return result[0];
  }
  return undefined;
}

export async function createStudentAccount(account: InsertStudentAccount) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(studentAccounts).values(account);
}

// Teacher account functions
export async function getTeacherByCode(teacherCode: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(teacherAccounts).where(
    eq(teacherAccounts.teacherCode, teacherCode)
  ).limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function createTeacherAccount(account: InsertTeacherAccount) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(teacherAccounts).values(account);
}

// Questions functions
export async function getQuestionsBySpherE(sphere: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(questions).where(eq(questions.sphere, sphere));
}

export async function getAllQuestions() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(questions);
}

export async function createQuestion(question: InsertQuestion) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(questions).values(question);
}

export async function updateQuestion(questionId: string, updates: Partial<InsertQuestion>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(questions).set(updates).where(eq(questions.questionId, questionId));
}

export async function deleteQuestion(questionId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(questions).where(eq(questions.questionId, questionId));
}

// Game session functions
export async function createGameSession(session: InsertGameSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(gameSessions).values(session);
  return result;
}

export async function updateGameSession(sessionId: number, updates: Partial<InsertGameSession>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(gameSessions).set(updates).where(eq(gameSessions.id, sessionId));
}

export async function getGameSession(sessionId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(gameSessions).where(eq(gameSessions.id, sessionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllGameSessions() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(gameSessions).orderBy(desc(gameSessions.createdAt));
}

export async function getStudentGameSessions(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(gameSessions).where(eq(gameSessions.studentId, studentId)).orderBy(desc(gameSessions.createdAt));
}

// Student results functions
export async function createStudentResult(result: InsertStudentResult) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(studentResults).values(result);
}

export async function getSessionResults(sessionId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(studentResults).where(eq(studentResults.sessionId, sessionId));
}

// Question response functions
export async function createQuestionResponse(response: InsertQuestionResponse) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(questionResponses).values(response);
}

export async function getSessionResponses(sessionId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(questionResponses).where(eq(questionResponses.sessionId, sessionId));
}
