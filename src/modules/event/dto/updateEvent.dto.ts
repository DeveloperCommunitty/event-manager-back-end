import {ApiProperty} from '@nestjs/swagger';


export class UpdateEventDto{
   @ApiProperty()
   nameEvent: string;

    @ApiProperty()
   description: string;

    @ApiProperty()
   latitude: number;

    @ApiProperty()
   longitude: number;

    @ApiProperty()
   dateTime: Date;
   
    @ApiProperty()
   ownerId: string;
}
