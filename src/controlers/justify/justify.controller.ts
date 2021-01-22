import {
  Controller,
  Post,
  UseGuards,
  Header,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { JustifyService } from './justify.service';
import { PlainBody } from 'src/decorators/plain-body.decorator';
import { JwtAuthGuard } from '../../commonServices/auth/auth.guard';
import { User } from 'src/models/user/user.interface';

interface BDD {
  [date: string]: {
    [email: string]: number;
  };
}

const tmpBdd: BDD = {};

@Controller('justify')
export class JustifyController {
  constructor(private justifyService: JustifyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'text/plain; charset=utf-8')
  justify(
    @Request() { user: { email } }: Request & { user: User },
    @PlainBody() body: string,
  ): string {
    // PaymentGuard
    const day = new Date().toDateString();
    if (!tmpBdd[day]) {
      tmpBdd[day] = {};
      if (!tmpBdd[day][email]) {
        tmpBdd[day][email] = 0;
      }
    }
    const words = tmpBdd[day][email];
    if (words + body.length > 80000) {
      throw new HttpException('Payment Required', HttpStatus.PAYMENT_REQUIRED);
    } else {
      tmpBdd[day][email] += body.length;
    }
    // PaymentGuard
    return this.justifyService.justify(body);
  }
}
