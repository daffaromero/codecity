import { HttpStatus } from '@nestjs/common';
import ApiError from './ApiError';

/**
 * Admin-Related Errors
 */
export const NoStaffFoundError = () => {
  throw new ApiError(
    HttpStatus.NOT_FOUND,
    'Staff not found',
    'Staff with the specified ID is not found',
  );
};

export const StaffAlreadyExistsError = () => {
  throw new ApiError(
    HttpStatus.CONFLICT,
    'Staff already exists',
    'There already exists an staff with this email',
  );
};

export const NoAttendancesFoundError = () => {
  throw new ApiError(
    HttpStatus.NOT_FOUND,
    'Attendances not found',
    'No attendances found for the specified staff and date',
  );
};

/**
 * Auth-Related Errors
 */

export const WrongPasswordError = () => {
  throw new ApiError(
    HttpStatus.UNAUTHORIZED,
    'Wrong password',
    'The password you provided is incorrect',
  );
};

export const NotAllowedError = () => {
  throw new ApiError(
    HttpStatus.UNAUTHORIZED,
    'Not allowed',
    'You are not allowed to perform this action',
  );
};
