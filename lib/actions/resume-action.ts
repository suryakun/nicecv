'use server';

import db from '@/prisma/db';
import { LLMResult } from '../llmResult';
import { redirect } from 'next/navigation';

export const updateResume = async (values: LLMResult, templateId?: string) => {
  await db.$transaction(async (tx) => {
    await tx.resume.update({
      where: {
        id: values.id, // Assuming `values` contains the `id` of the resume to update
      },
      data: {
        title: values.title,
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        summary: values.summary,
      },
    });

    for (const experience of values.experience) {
      await tx.experience.upsert({
        where: {
          id: experience.id,
        },
        create: {
          company: experience.company,
          workTime: experience.workTime,
          title: experience.title,
          jobDetail: experience.jobDetail,
          resume: {
            connect: {
              id: values.id,
            },
          },
        },
        update: {
          company: experience.company,
          workTime: experience.workTime,
          title: experience.title,
          jobDetail: experience.jobDetail,
        },
      });
    }

    for (const skill of values.skill) {
      await tx.skill.upsert({
        where: {
          id: skill.id,
        },
        create: {
          skillName: skill.skillName,
          yearOfExperience: skill.yearOfExperience,
          resume: {
            connect: {
              id: values.id,
            },
          },
        },
        update: {
          skillName: skill.skillName,
          yearOfExperience: skill.yearOfExperience,
        },
      });
    }

    for (const education of values.education) {
      await tx.education.upsert({
        where: {
          id: education.id,
        },
        create: {
          name: education.name,
          time: education.time,
          description: education.description,
          resume: {
            connect: {
              id: values.id,
            },
          },
        },
        update: {
          name: education.name,
          time: education.time,
          description: education.description,
        },
      });
    }

    for (const course of values.course) {
      await tx.course.upsert({
        where: {
          id: course.id,
        },
        create: {
          name: course.name,
          time: course.time,
          description: course.description,
          resume: {
            connect: {
              id: values.id,
            },
          },
        },
        update: {
          name: course.name,
          time: course.time,
          description: course.description,
        },
      });
    }

    for (const award of values.award) {
      await tx.award.upsert({
        where: {
          id: award.id,
        },
        create: {
          name: award.name,
          time: award.time,
          description: award.description,
          resume: {
            connect: {
              id: values.id,
            },
          },
        },
        update: {
          name: award.name,
          time: award.time,
          description: award.description,
        },
      });
    }

    for (const language of values.language) {
      await tx.language.upsert({
        where: {
          id: language.id,
        },
        create: {
          name: language.name,
          level: language.level,
          resume: {
            connect: {
              id: values.id,
            },
          },
        },
        update: {
          name: language.name,
          level: language.level,
        },
      });
    }

    for (const reference of values.reference) {
      await tx.reference.upsert({
        where: {
          id: reference.id,
        },
        create: {
          name: reference.name,
          position: reference.position,
          company: reference.company,
          phone: reference.phone,
          email: reference.email,
          resume: {
            connect: {
              id: values.id,
            },
          },
        },
        update: {
          name: reference.name,
          position: reference.position,
          company: reference.company,
          phone: reference.phone,
          email: reference.email,
        },
      });
    }

    for (const certification of values.certification) {
      await tx.certification.upsert({
        where: {
          id: certification.id,
        },
        create: {
          name: certification.name,
          time: certification.time,
          description: certification.description,
          resume: {
            connect: {
              id: values.id,
            },
          },
        },
        update: {
          name: certification.name,
          time: certification.time,
          description: certification.description,
        },
      });
    }
  });

  redirect(`/builder/preview/${templateId}/resume/${values.id}`);
};

export const createNewResume = async (values: LLMResult) => {
  await db.$transaction(async (tx) => {
    const resume = await tx.resume.create({
      data: {
        title: values.title,
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        summary: values.summary,
      },
    });

    for (const experience of values.experience) {
      await tx.experience.create({
        data: {
          company: experience.company,
          workTime: experience.workTime,
          title: experience.title,
          jobDetail: experience.jobDetail,
          resume: {
            connect: {
              id: resume.id,
            },
          },
        },
      });
    }

    for (const skill of values.skill) {
      await tx.skill.create({
        data: {
          skillName: skill.skillName,
          yearOfExperience: skill.yearOfExperience,
          resume: {
            connect: {
              id: resume.id,
            },
          },
        },
      });
    }

    for (const education of values.education) {
      await tx.education.create({
        data: {
          name: education.name,
          time: education.time,
          description: education.description,
          resume: {
            connect: {
              id: resume.id,
            },
          },
        },
      });
    }

    for (const course of values.course) {
      await tx.course.create({
        data: {
          name: course.name,
          time: course.time,
          description: course.description,
          resume: {
            connect: {
              id: resume.id,
            },
          },
        },
      });
    }

    for (const award of values.award) {
      await tx.award.create({
        data: {
          name: award.name,
          time: award.time,
          description: award.description,
          resume: {
            connect: {
              id: resume.id,
            },
          },
        },
      });
    }

    for (const language of values.language) {
      await tx.language.create({
        data: {
          name: language.name,
          level: language.level,
          resume: {
            connect: {
              id: resume.id,
            },
          },
        },
      });
    }

    for (const reference of values.reference) {
      await tx.reference.create({
        data: {
          name: reference.name,
          position: reference.position,
          company: reference.company,
          phone: reference.phone,
          email: reference.email,
          resume: {
            connect: {
              id: resume.id,
            },
          },
        },
      });
    }

    for (const certification of values.certification) {
      await tx.certification.create({
        data: {
          name: certification.name,
          time: certification.time,
          description: certification.description,
          resume: {
            connect: {
              id: resume.id,
            },
          },
        },
      });
    }
  });
};
