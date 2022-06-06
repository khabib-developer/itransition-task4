export class UserDto {
  name;
  blocked;
  email;
  id;
  registrationTime;
  loginTime;
  constructor(model: any) {
    this.name = model.name;
    this.email = model.email;
    this.blocked = model.blocked;
    this.id = model.id;
    this.registrationTime = model.createdAt;
    this.loginTime = model.updatedAt;
  }
}
