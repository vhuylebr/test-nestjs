import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { User } from 'src/models/user/user.interface';
import { AuthService } from 'src/commonServices/auth/auth.service';
import { JoiValidationPipe } from '../../pipes/joi-validation-pipe.pipe';
import * as Joi from 'joi';

const userJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

@Controller('token')
export class TokenController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(userJoiSchema))
  async login(@Body() body: User) {
    return this.authService.login(body);
  }
}
