import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Student authentication
  student: router({
    login: publicProcedure
      .input(z.object({
        studentNumber: z.string().min(1),
        studentName: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        const student = await db.getStudentByNumberAndName(input.studentNumber, input.studentName);
        
        if (student) {
          return {
            success: true,
            studentId: student.id,
            studentName: student.studentName,
          };
        }
        
        // If student doesn't exist, create one
        await db.createStudentAccount({
          studentNumber: input.studentNumber,
          studentName: input.studentName,
        });
        
        const newStudent = await db.getStudentByNumberAndName(input.studentNumber, input.studentName);
        return {
          success: true,
          studentId: newStudent?.id || 0,
          studentName: input.studentName,
        };
      }),
  }),

  // Teacher authentication
  teacher: router({
    login: publicProcedure
      .input(z.object({
        teacherCode: z.string().min(1),
        password: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        const teacher = await db.getTeacherByCode(input.teacherCode);
        
        if (teacher && teacher.password === input.password) {
          return {
            success: true,
            teacherId: teacher.id,
            teacherName: teacher.teacherName,
          };
        }
        
        return {
          success: false,
          error: "Invalid credentials",
        };
      }),
  }),

  // Game scoring API
  game: router({
    // Start a new game session
    startSession: publicProcedure
      .input(z.object({
        studentId: z.number(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createGameSession({
          studentId: input.studentId,
          startTime: new Date(),
        });
        return result;
      }),

    // Submit game completion and final score
    submitScore: publicProcedure
      .input(z.object({
        sessionId: z.number(),
        totalScore: z.number(),
        completedSpheres: z.number(),
        endTime: z.date(),
      }))
      .mutation(async ({ input }) => {
        await db.updateGameSession(input.sessionId, {
          totalScore: input.totalScore,
          completedSpheres: input.completedSpheres,
          endTime: input.endTime,
          isCompleted: 1,
        });
        return { success: true };
      }),

    // Submit sphere results
    submitSphereResult: publicProcedure
      .input(z.object({
        sessionId: z.number(),
        sphere: z.enum(["biology", "chemistry", "physics"]),
        questionsAttempted: z.number(),
        correctAnswers: z.number(),
        sphereScore: z.number(),
      }))
      .mutation(async ({ input }) => {
        await db.createStudentResult({
          sessionId: input.sessionId,
          sphere: input.sphere,
          questionsAttempted: input.questionsAttempted,
          correctAnswers: input.correctAnswers,
          sphereScore: input.sphereScore,
          completedAt: new Date(),
        });
        return { success: true };
      }),

    // Submit individual question response
    submitQuestionResponse: publicProcedure
      .input(z.object({
        sessionId: z.number(),
        questionId: z.string(),
        sphere: z.string(),
        selectedAnswerIndex: z.number().optional(),
        isCorrect: z.boolean(),
        responseTime: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createQuestionResponse({
          sessionId: input.sessionId,
          questionId: input.questionId,
          sphere: input.sphere,
          selectedAnswerIndex: input.selectedAnswerIndex,
          isCorrect: input.isCorrect ? 1 : 0,
          responseTime: input.responseTime,
        });
        return { success: true };
      }),

    // Get all game sessions (for teacher dashboard)
    getAllSessions: publicProcedure.query(async () => {
      return await db.getAllGameSessions();
    }),

    // Get student's game sessions
    getStudentSessions: publicProcedure
      .input(z.object({ studentId: z.number() }))
      .query(async ({ input }) => {
        return await db.getStudentGameSessions(input.studentId);
      }),

    // Get specific session details
    getSession: publicProcedure
      .input(z.object({ sessionId: z.number() }))
      .query(async ({ input }) => {
        const session = await db.getGameSession(input.sessionId);
        const results = await db.getSessionResults(input.sessionId);
        const responses = await db.getSessionResponses(input.sessionId);
        
        return {
          session,
          results,
          responses,
        };
      }),

    // Get session results by ID
    getSessionResults: publicProcedure
      .input(z.object({ sessionId: z.number() }))
      .query(async ({ input }) => {
        return await db.getSessionResults(input.sessionId);
      }),
  }),

  // Questions management API
  questions: router({
    // Get all questions
    getAll: publicProcedure.query(async () => {
      return await db.getAllQuestions();
    }),

    // Get questions by sphere
    getBySpherE: publicProcedure
      .input(z.object({ sphere: z.string() }))
      .query(async ({ input }) => {
        return await db.getQuestionsBySpherE(input.sphere);
      }),

    // Create a new question (teacher only)
    create: publicProcedure
      .input(z.object({
        questionId: z.string(),
        sphere: z.string(),
        questionText: z.string(),
        answers: z.string(),
        correctAnswerIndex: z.number(),
        explanation: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createQuestion({
          questionId: input.questionId,
          sphere: input.sphere,
          questionText: input.questionText,
          answers: input.answers,
          correctAnswerIndex: input.correctAnswerIndex,
          explanation: input.explanation,
        });
        return { success: true };
      }),

    // Update a question (teacher only)
    update: publicProcedure
      .input(z.object({
        questionId: z.string(),
        questionText: z.string().optional(),
        answers: z.string().optional(),
        correctAnswerIndex: z.number().optional(),
        explanation: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { questionId, ...updates } = input;
        await db.updateQuestion(questionId, updates);
        return { success: true };
      }),

    // Delete a question (teacher only)
    delete: publicProcedure
      .input(z.object({ questionId: z.string() }))
      .mutation(async ({ input }) => {
        await db.deleteQuestion(input.questionId);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
