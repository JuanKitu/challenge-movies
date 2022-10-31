/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
export abstract class BaseError {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public code: number,
    public name: string,
    public title: string,
    public description: string,
    public originalName?: string,
    public stackTrace?: string
  ) {}

  public toPlainObject(): object {
    /* if (APP_ENV === 'development') {
        return {
          code: this.code,
          name: this.name,
          title: this.title,
          description: this.description,
          originalName: this.originalName,
          stackTrace: this.stackTrace,
        };
      } */

    return {
      code: this.code,
      name: this.name,
      title: this.title,
      description: this.description,
    };
  }
}
