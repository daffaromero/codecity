# Kotakodelab Full-Stack / Backend homework (TypeScript, REST API)

Welcome to the Kotakodelab work sample for Full-Stack developers (TypeScript & NestJS)! This is our way to get some experience working with you and to gauge your skill in using TypeScript and the databases. There is no official time-limit for this exercise, but you should finish it within a week. We encourqage you to take the time you need in order to **provide quality work that best reflects your skills**

## Context

We have implemented basic backend service written in TypeScript also implemented TypeORM as the ORM to create Staffs. Currently, we would like to extend the service, so we need to track the **staffs attendance** by creating Clock in & Clock out features.

## Data Models & Relationships

The `Staffs` has fields: `id`, `staffId`, `username`, `firstName`, `lastName`, `email`, `passwordHash`

we still don't have Model for the `Attendance` so here is your task to add the model for the **Attendance**, it's up to you to name the Model but please give a name that fits. and also please add the relation between `Staffs` and the **Attendance**

## Technical Requirements

You have to use `TypeScript >4.0`. A relational database like SQLite, MySQL or Postgres is probably a good idea as well.
Regarding an ORM and SQL query builder you should use `TypeORM`. For testing we recommend to use `jest` but feel free
to use a different test framework if needed.

## Final Notes

When running the service with `yarn start:dev` and if you implements the test unit or e2e test is a big plus!

Also, please take a look at the provided `scripts` in `package.json` as they might give you some more ideas about that
is expected.

Some documentation and good unit tests will be much appreciated. Please make sure to apply common design patterns and
best practices like you would do for any of your professional projects.

Are you usually using additional tools in your projects? We can’t wait to hear about your best practices and why you
think it's important to use them! Please provide your best practices in the questionnaire when submitting your project.

## Encouragement

Kotakodelab team members have worked through this work sample to make sure we are not asking for too much of your time.
This shouldn't take you longer than a couple of hours depending on your knowledge and the bells and whistles you want
to add. We are looking forward to hearing from you!

## Requirements Checklist

- [x] Should be able to create Staff
- [x] Should be able to update Staff
- [x] Staff should be able to login
- [x] Staff should be able to logout
- [ ] Staff should not be able to update another staff dat
- [ ] Staff should be able to clock in
- [ ] Staff should be able to clock out
