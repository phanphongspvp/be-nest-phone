import { ParseIntPipe, ArgumentMetadata, Injectable } from '@nestjs/common';

@Injectable()
export class ParseOptionalIntPipe extends ParseIntPipe {
  async transform(value: any, metadata: ArgumentMetadata): Promise<number | undefined> {
    try {
      const parsedValue = await super.transform(value, metadata);
      return parsedValue;
    } catch (error) {
      return undefined;
    }
  }
}
