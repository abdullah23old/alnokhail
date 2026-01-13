import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

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

  // Reports router
  reports: router({
    create: protectedProcedure
      .input(z.object({
        reportType: z.enum(["los_santos", "sandy_paleto", "officers", "zone_officers"]),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        data: z.object({}).passthrough(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        const result = await db.createReport(ctx.user.id, {
          reportType: input.reportType,
          startTime: input.startTime,
          endTime: input.endTime,
          data: input.data,
        });
        
        return { success: true };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        return db.getUserReports(ctx.user.id);
      }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        return db.getReportById(input.id, ctx.user.id);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        return db.deleteReport(input.id, ctx.user.id);
      }),
  }),

  // Files router
  files: router({
    upload: protectedProcedure
      .input(z.object({
        filename: z.string(),
        fileData: z.string(), // base64 encoded
        mimeType: z.string(),
        reportId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        try {
          // Decode base64 to buffer
          const buffer = Buffer.from(input.fileData, 'base64');
          
          // Generate unique file key
          const fileKey = `reports/${ctx.user.id}/${nanoid()}-${input.filename}`;
          
          // Upload to S3
          const { url } = await storagePut(fileKey, buffer, input.mimeType);
          
          // Save file metadata to database
          const result = await db.createFile(ctx.user.id, {
            filename: input.filename,
            fileKey,
            url,
            mimeType: input.mimeType,
            size: buffer.length,
            reportId: input.reportId,
          });
          
          return { success: true, url, fileKey };
        } catch (error) {
          console.error("File upload error:", error);
          throw new Error("Failed to upload file");
        }
      }),

    listByReport: protectedProcedure
      .input(z.object({ reportId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        return db.getReportFiles(input.reportId, ctx.user.id);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        return db.deleteFile(input.id, ctx.user.id);
      }),
  }),

  // Wave Names router
  waveNames: router({
    create: protectedProcedure
      .input(z.object({
        position: z.string(),
        code: z.string(),
        fullName: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        return db.createWaveName(ctx.user.id, input);
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        return db.getUserWaveNames(ctx.user.id);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Unauthorized");
        
        return db.deleteWaveName(input.id, ctx.user.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
