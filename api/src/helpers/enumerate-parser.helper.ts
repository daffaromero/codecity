import {
  GenderTypeEnum,
  HouseTypeEnum,
  ReligionTypeEnum,
  StatusTypeEnum,
} from 'src/types/enums';
import { ACTIVE_STATUS, GENDER, HOUSE, RELIGION } from 'src/types/constants';

// return the key of declared enum if the field type is enum,
// either return original value

export const enumerateParser = (field: string, value: string | number): any => {
  const enumsList = [
    { name: ACTIVE_STATUS, enumTarget: StatusTypeEnum },
    { name: GENDER, enumTarget: GenderTypeEnum },
    { name: RELIGION, enumTarget: ReligionTypeEnum },
    { name: HOUSE, enumTarget: HouseTypeEnum },
  ];

  const isEnumFound = enumsList.find((el) => el.name === field);

  if (isEnumFound) {
    return isEnumFound.enumTarget[value];
  }

  return value;
};
