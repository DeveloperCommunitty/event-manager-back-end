import { ApiProperty } from "@nestjs/swagger";


export class CreateEventDto {
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
