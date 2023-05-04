export class User {
  id: string;
  name: string;
  avatar: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  verified: Boolean;

  constructor(
    id: string,
    name: string,
    avatar: string,
    username: string,
    email: string,
    password: string,
    passwordConfirm: string,
    verified: Boolean
  ) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.username = username;
    this.email = email;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.verified = verified;
  }
}
